import os
import time
import json
import hashlib
import logging
from datetime import datetime
import pandas as pd
import requests
from dotenv import load_dotenv

# Firestore imports
import firebase_admin
from firebase_admin import credentials, firestore

# Configure logging to monitor the script's progress
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Get HuggingFace API key
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")

# Firebase and Firestore Setup
try:
    cred = credentials.Certificate('../../../resqapp-815a4-firebase-adminsdk-fbsvc-33cae48925.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    logger.info("Firebase initialized successfully")
except Exception as e:
    logger.error(f"Firebase initialization failed: {e}")
    raise

# Helper Functions
def generate_document_id(url):
    """Generate a unique document ID using a hash of the URL. Max 20 characters."""
    return hashlib.sha256(url.encode('utf-8')).hexdigest()[:20]

def clear_content_collection():
    """Delete all documents in the 'content' collection."""
    logger.info("Clearing all documents from the 'content' collection...")
    docs = list(db.collection("content").stream())
    count = 0
    for doc in docs:
        doc.reference.delete()
        count += 1
    logger.info(f"Deleted {count} documents from 'content' collection.")

# Provided Firestore Save Function
def save_to_firestore(item, tech_area_id):
    """Update or create document in Firestore."""
    doc_id = generate_document_id(item["url"])
    doc_ref = db.collection("content").document(doc_id)
    try:
        try:
            pub_date = datetime.fromisoformat(item["date"].replace("Z", "+00:00"))
        except Exception:
            pub_date = datetime.now()
        doc_data = {
            "title": item["generated_title"][:200],
            "summary": item["enhanced_summary"],
            "keyPoints": item["key_points"],  
            "picture": item.get("picture", "")[:500],
            "publisher": item["publisher"][:100],
            "datePublished": pub_date,
            "techAreaId": tech_area_id,
            "url": item["url"],
            "createdAt": firestore.SERVER_TIMESTAMP
        }
        doc_ref.set(doc_data)
        logger.info(f"Document created/updated: {doc_id} with techAreaId: {tech_area_id}")
        return True
    except Exception as e:
        logger.error(f"Firestore operation failed: {e}")
        return False
    
# Tech Area Functions

def get_tech_areas():
    """
    Fetch tech areas from Firestore.
    Returns a dictionary mapping the tech area name (as stored in Firestore) to its document ID.
    DO NOT create any new tech areas.
    """
    logger.info("Fetching tech areas from Firestore")
    tech_areas = {}
    docs = list(db.collection('techArea').stream())
    for doc in docs:
        data = doc.to_dict()
        if not data.get("name"):
            logger.warning(f"Invalid techArea document {doc.id} - missing required field 'name'. Deleting document.")
            doc.reference.delete()
        else:
        
            tech_areas[data["name"]] = doc.id
    logger.info(f"Loaded {len(tech_areas)} tech areas: {tech_areas}")
    return tech_areas


# Summarization Function
def summarize_content(content, model_id="mistralai/Mistral-7B-Instruct-v0.2"):
    """
    Use Mistral through Hugging Face's API to generate a summary with 3 key points.
    
    Returns a dictionary with:
      - "summary": a concise summary (max 2 sentences)
      - "key_points": a list of exactly 3 key points (each starting with a bullet)
    """
    api_url = f"https://api-inference.huggingface.co/models/{model_id}?variant=text-generation-inference"
    headers = {
        "Authorization": f"Bearer {HUGGINGFACE_API_KEY}",
        "Content-Type": "application/json"
    }
    prompt = f"""<s>[INST] Please use the following content and provide:
1. A concise summary (Max 2 sentences)
2. Exactly 3 key points in bullet form

Use this Content:
{content}

Format your response as follows:

SUMMARY: [Your concise summary here]

KEY POINTS:
• [Key point 1]
• [Key point 2]
• [Key point 3]

Focus on extracting the most important information and main ideas.
You must generate both the SUMMARY and KEY POINTS sections.
 [/INST]</s>"""
    payload = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": 500,
            "temperature": 0.3,
            "top_p": 0.95,
            "return_full_text": False
        }
    }
    max_retries = 3
    retry_delay = 5
    for attempt in range(max_retries):
        try:
            logger.info(f"Attempt {attempt+1}: Sending request to AI model...")
            response = requests.post(api_url, headers=headers, json=payload)
            if response.status_code == 503:
                logger.info(f"Model is loading. Waiting {retry_delay} seconds before retry...")
                time.sleep(retry_delay)
                continue
            response.raise_for_status()
            result = response.json()[0]["generated_text"]
            logger.info(f"Received AI response (first 100 chars): {result.strip()[:100]}...")
            lines = result.strip().split('\n')
            summary = ""
            key_points = []
            in_summary = False
            in_key_points = False
            for line in lines:
                if "SUMMARY:" in line:
                    in_summary = True
                    in_key_points = False
                    summary = line.replace("SUMMARY:", "").strip()
                elif "KEY POINTS:" in line:
                    in_summary = False
                    in_key_points = True
                elif in_key_points and any(bullet in line for bullet in ["•", "-", "*"]):
                    clean_line = line.replace("•", "").replace("-", "").replace("*", "").strip()
                    key_points.append("• " + clean_line)
            while len(key_points) < 3:
                key_points.append("• Not enough information for additional key points")
            logger.info(f"Extracted Summary: {summary}")
            logger.info(f"Extracted Key Points: {key_points}")
            return {"summary": summary, "key_points": key_points[:3]}
        except requests.exceptions.HTTPError as e:
            logger.error(f"HTTP error: {e}")
            if attempt < max_retries - 1:
                logger.info(f"Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
            else:
                raise
        except Exception as e:
            logger.error(f"Error: {e}")
            if attempt < max_retries - 1:
                logger.info(f"Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
            else:
                raise

# CSV Processing and Firestore Update
def update_firestore(dataframe):
    """
    Update Firestore 'content' collection with rows from the dataframe.
    Uses save_to_firestore() to update or create each document.
    Each document includes:
      - createdAt: Firestore server timestamp
      - datePublished: from CSV's 'date' column
      - picture: from CSV's 'picture' column
      - publisher: from CSV's 'publisher' column
      - summary: generated summary
      - keyPoints: generated key points (new field)
      - techAreaId: the document ID from the techArea collection corresponding to the CSV's topic value
      - title: from CSV's 'title' column (mapped to generated_title)
    """
    tech_areas = get_tech_areas()
    topic_field = None
    for col in dataframe.columns:
        if col in ["topic", "techArea", "tech_area"]:
            topic_field = col
            break

    for index, row in dataframe.iterrows():
        if topic_field and pd.notna(row[topic_field]) and row[topic_field] != "":
            csv_topic = row[topic_field]
            logger.info(f"Comparing CSV topic: '{csv_topic}' with available tech areas: {list(tech_areas.keys())}")
            if csv_topic in tech_areas:
                tech_area_id = tech_areas[csv_topic]
                logger.info(f"Found match for '{csv_topic}': {tech_area_id}")
            else:
                logger.warning(f"Tech area '{csv_topic}' not found in Firestore. Using default.")
                tech_area_id = "default_tech_area"
        else:
            tech_area_id = "default_tech_area"
        item = {
            "url": row["url"],
            "date": row["date"],
            "generated_title": row["title"],
            "enhanced_summary": row["summary"],
            "key_points": row["Key_points"],
            "picture": row.get("picture", ""),
            "publisher": row["publisher"]
        }
        save_to_firestore(item, tech_area_id)

def process_csv(file_path, output_path, model_id="mistralai/Mistral-7B-Instruct-v0.2"):
    """
    Process the CSV file by generating summaries and key points 
    Only rows with generated summary and key points are retained.
    The valid rows are saved to a new CSV file and then used to update the Firestore 'content' collection.
    Before updating, the function clears all documents in the 'content' collection.
    """
    logger.info(f"Loading CSV file from: {file_path}")
    df = pd.read_csv(file_path)
    valid_rows = []
    for index, row in df.iterrows():
        logger.info(f"Processing item {index+1}/{len(df)}...")
        if 'full_content' in row and pd.notna(row['full_content']) and row['full_content'] != "":
            try:
                result = summarize_content(row['full_content'], model_id)
                if result.get("summary") and result.get("key_points"):
                    key_points_str = "\n".join(result["key_points"])
                    logger.info(f"Item {index+1} - Summary: {result['summary']}")
                    logger.info(f"Item {index+1} - Key Points:\n{key_points_str}")
                    new_row = row.copy()
                    new_row["summary"] = result["summary"]
                    new_row["Key_points"] = key_points_str
                    valid_rows.append(new_row)
                else:
                    logger.info(f"Item {index+1} did not produce valid summary and key points. Skipping.")
            except Exception as e:
                logger.error(f"Error processing item {index+1}: {str(e)}")
        else:
            logger.info(f"Skipping item {index+1}: No content to summarize")
    if valid_rows:
        new_df = pd.DataFrame(valid_rows)
        new_df.to_csv(output_path, index=False)
        logger.info(f"Processing complete! Results saved to {output_path}")
        clear_content_collection()
        update_firestore(new_df)
    else:
        logger.info("No valid rows processed. No output CSV generated.")

# Main Execution
if __name__ == "__main__":
    input_file = "crawled_content.csv"         
    output_file = "articles_with_summaries.csv" 
    model_id = "mistralai/Mistral-7B-Instruct-v0.2"  
    
    if not os.getenv("HUGGINGFACE_API_KEY"):
        logger.error("Error: HUGGINGFACE_API_KEY not found in .env file")
    else:
        process_csv(input_file, output_file, model_id)
