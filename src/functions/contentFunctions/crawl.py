import os
import csv
import requests
import hashlib
import logging
import time
import random
from datetime import datetime, timedelta
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore
from requests.exceptions import HTTPError
from bs4 import BeautifulSoup
from langdetect import detect, LangDetectException
import feedparser

# -------------------- Setup & Configuration --------------------
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(f'content_crawler_{datetime.now().strftime("%Y%m%d")}.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Initialize Firebase
try:
    cred = credentials.Certificate('../../../resqapp-815a4-firebase-adminsdk-fbsvc-33cae48925.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    logger.info("Firebase initialized successfully")
except Exception as e:
    logger.error(f"Firebase initialization failed: {e}")
    raise

# Load environment variables
load_dotenv()

# Configuration parameters
UPDATED_TOPICS = ["AI", "Software Development", "Data Science", "UI/UX", "Web Development", "Cloud Computing", "Cybersecurity"]
DAYS_BACK = 7
MAX_RESULTS_PER_SOURCE = 10
MAX_ARTICLES_PER_TOPIC = 10
REQUEST_TIMEOUT = 10

# API Keys (from .env file)
GNEWS_API_KEY = os.getenv('GNEWS_API_KEY')
GUARDIAN_API_KEY = os.getenv('GUARDIAN_API_KEY')
NEWSDATA_API_KEY = os.getenv('NEWSDATA_API_KEY')
NEWS_API_KEY = os.getenv('NEWS_API_KEY')
DEVTO_API_KEY = os.getenv('DEVTO_API_KEY')

# Define picture links for topics (each topic has 2 image URLs)
PICTURE_LINKS = {
    "Data Science": [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2947&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    "Software Development": [
        "https://images.unsplash.com/photo-1579403124614-197f69d8187b?q=80&w=3394&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=3606&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    "UI/UX": [
        "https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b?q=80&w=3571&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1661412938808-a0f7be3c8cf1?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    "AI": [
        "https://plus.unsplash.com/premium_photo-1714618828448-abf8732500c6?q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1682124651258-410b25fa9dc0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWFjaGluZSUyMExlYXJuaW5nfGVufDB8fDB8fHww"
    ],
    "Web Development": [
        "https://images.unsplash.com/photo-1579403124614-197f69d8187b?q=80&w=3394&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=3606&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    "Cloud Computing": [
        "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2xvdWQlMjBDb21wdXRpbmd8ZW58MHx8MHx8fDA%3D"
    ],
    "Cybersecurity": [
        "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1661764393655-1dbffee8c0ce?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
}

# -------------------- AI Enhancement via Hugging Face --------------------
def enhance_content_with_ai(item):
    """
    Enhance article content using Hugging Face Inference API by performing two separate calls:
    one to get a 2-sentence summary and an SEO-friendly title and another for 3 key bullet points.
    The responses are then concatenated and returned as a dictionary containing "generated_title"
    and "enhanced_summary".
    """
    title = item["title"]
    content_for_ai = item.get("full_content") or item.get("description", "")
    
    # First prompt for summary and SEO-friendly title
    summary_prompt = f"""Analyze the following article content and provide:
1. A 2-sentence summary.
2. A short, precise, and concise SEO-friendly title.

Content: {content_for_ai}

Format response as:
Summary: [summary]
Title: [title]"""
    
    # Second prompt for key bullet points
    keypoints_prompt = f"""Analyze the following article content and provide:
3 key bullet points.

Content: {content_for_ai}

Format response as:
Key Points:
- [point1]
- [point2]
- [point3]

"""
    
    api_key = os.getenv("HUGGINGFACE_API_KEY")
    model_id = "mistralai/Mistral-7B-Instruct-v0.1"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    def call_huggingface(prompt):
        payload = {
            "inputs": prompt,
            "parameters": {
                "max_new_tokens": 512,
                "temperature": 0.7,
                "top_p": 0.95
            }
        }
        api_url = f"https://api-inference.huggingface.co/models/{model_id}?variant=text-generation-inference"
        try:
            response = requests.post(api_url, headers=headers, json=payload, timeout=30)
            if response.status_code == 200:
                result = response.json()
                if isinstance(result, list):
                    return result[0].get("generated_text", "")
                return result.get("generated_text", "")
            else:
                logger.error(f"Hugging Face API error: {response.status_code}, {response.text}")
                return ""
        except Exception as e:
            logger.error(f"Hugging Face API request failed: {e}")
            return ""
    
    summary_response = call_huggingface(summary_prompt)
    keypoints_response = call_huggingface(keypoints_prompt)
    
    # Parse the summary response for summary and title
    summary = ""
    generated_title = title
    for line in summary_response.split("\n"):
        if line.startswith("Summary:"):
            summary = line.replace("Summary:", "").strip()
        elif line.startswith("Title:"):
            generated_title = line.replace("Title:", "").strip()
    
    # Parse the keypoints response for key points
    key_points = []
    for line in keypoints_response.split("\n"):
        if line.startswith("Key Points:"):
            continue
        if line.startswith("- "):
            key_points.append(line[2:].strip())
    
    # Concatenate the results
    enhanced_summary = summary + "\n\nKey Points:\n" + "\n".join(f"- {point}" for point in key_points[:3])
    return {"generated_title": generated_title, "enhanced_summary": enhanced_summary}

# -------------------- Database & Utility Functions --------------------
def clear_content_collection():
    """Delete all documents in the 'content' collection."""
    logger.info("Clearing content collection...")
    docs = list(db.collection('content').stream())
    for doc in docs:
        doc.reference.delete()
    logger.info("Content collection cleared.")

def get_tech_areas():
    """
    Fetch tech areas from Firestore.
    If a topic in UPDATED_TOPICS doesn't exist, create it.
    Returns a dictionary mapping tech area name to document ID.
    """
    logger.info("Fetching tech areas from Firestore")
    tech_areas = {}
    docs = list(db.collection('techArea').stream())
    for doc in docs:
        data = doc.to_dict()
        if not data.get("name"):
            logger.warning(f"Invalid techArea document {doc.id} - missing required fields. Deleting document.")
            doc.reference.delete()
        else:
            tech_areas[data["name"]] = doc.id

    for topic in UPDATED_TOPICS:
        if topic not in tech_areas:
            logger.info(f"Tech area '{topic}' not found. Creating new document.")
            doc_ref, _ = db.collection("techArea").add({"name": topic})
            tech_areas[topic] = doc_ref.id

    logger.info(f"Loaded {len(tech_areas)} tech areas: {tech_areas}")
    return tech_areas

def check_api_connectivity():
    """Verify API connectivity for GNews API."""
    logger.info("Testing API connectivity for GNews")
    try:
        gnews_url = "https://gnews.io/api/v4/top-headlines"
        response = requests.get(gnews_url, params={"token": GNEWS_API_KEY, "lang": "en", "max": 1}, timeout=REQUEST_TIMEOUT)
        if response.status_code != 200:
            logger.error("GNews API connectivity failed")
            return False
        logger.debug("GNews API connectivity verified")
    except Exception as e:
        logger.error(f"GNews API connection failed: {e}")
        return False
    return True

def generate_document_id(url):
    """Create a SHA256 hash ID from the URL."""
    return hashlib.sha256(url.encode()).hexdigest()[:20]

def fetch_with_retry(url, params, headers, max_retries=3):
    """Robust API request handler with retry logic."""
    for attempt in range(max_retries):
        try:
            response = requests.get(url, params=params, headers=headers, timeout=REQUEST_TIMEOUT)
            response.raise_for_status()
            return response
        except HTTPError as e:
            if e.response.status_code == 429:
                retry_after = int(e.response.headers.get('Retry-After', 30))
                logger.warning(f"Rate limited. Retry {attempt+1}/{max_retries} in {retry_after}s")
                time.sleep(retry_after)
            else:
                logger.error(f"HTTP Error {e.response.status_code}: {e.response.text}")
                raise
        except Exception as e:
            logger.error(f"Request failed: {e}")
            if attempt == max_retries - 1:
                raise
    return None

# -------------------- Full Content Extraction 
def fetch_full_content(article_url):
    """
    Extract the full article content from a URL using multiple heuristics.
    This function attempts several methods to extract as much content as possible.
    """
    try:
        headers = {
            'User-Agent': ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                           'AppleWebKit/537.36 (KHTML, like Gecko) '
                           'Chrome/91.0.4472.124 Safari/537.36')
        }
        response = requests.get(article_url, headers=headers, timeout=15)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            potential_content = []

            # Method 1: Look for <article> tags
            article_tag = soup.find('article')
            if article_tag:
                potential_content.append(article_tag.get_text(separator=' ', strip=True))

            # Method 2: Look for common content divs
            content_divs = soup.select('.article-content, .post-content, .entry-content, [itemprop="articleBody"], .story-body')
            for div in content_divs:
                potential_content.append(div.get_text(separator=' ', strip=True))

            # Method 3: Look for paragraphs within the main content
            main_content = soup.find('main') or soup.find('div', {'id': 'main'})
            if main_content:
                paragraphs = main_content.find_all('p')
                if paragraphs:
                    text = ' '.join([p.get_text(strip=True) for p in paragraphs])
                    potential_content.append(text)

            # Method 4: If none of the above worked, get all paragraphs
            if not potential_content:
                paragraphs = soup.find_all('p')
                if paragraphs:
                    text = ' '.join([p.get_text(strip=True) for p in paragraphs])
                    potential_content.append(text)

            if potential_content:
                return max(potential_content, key=len)
            else:
                return "Could not extract article content"
        else:
            return f"Error accessing URL: {response.status_code}"
    except Exception as e:
        return f"Error extracting content: {str(e)}"

# -------------------- Source Functions --------------------
def fetch_gnews(topic):
    """Fetch articles from the GNews API."""
    logger.info(f"Fetching GNews API results for: {topic}")
    results = []
    if not GNEWS_API_KEY:
        logger.error("GNews API key is missing.")
        return results
    try:
        params = {
            "q": topic,
            "token": GNEWS_API_KEY,
            "lang": "en",
            "max": MAX_RESULTS_PER_SOURCE,
            "sortBy": "publishedAt"
        }
        response = fetch_with_retry("https://gnews.io/api/v4/search", params=params, headers={})
        if response:
            data = response.json()
            for article in data.get('articles', []):
                results.append({
                    "title": article.get('title', 'No title'),
                    "url": article.get('url', ''),
                    "source": "GNews",
                    "date": article.get('publishedAt', ''),
                    "publisher": article.get('source', {}).get('name', 'Unknown'),
                    "picture": article.get('image', ''),
                    "description": article.get('description', ''),
                    "content": article.get('content', '')
                })
            logger.info(f"GNews returned {len(results)} articles")
    except Exception as e:
        logger.error(f"GNews API processing error: {e}")
    return results

def fetch_guardian(topic):
    """Fetch articles from The Guardian API."""
    logger.info(f"Fetching Guardian API results for: {topic}")
    results = []
    if not GUARDIAN_API_KEY:
        logger.error("Guardian API key is missing.")
        return results
    try:
        params = {
            "q": topic,
            "api-key": GUARDIAN_API_KEY,
            "show-fields": "thumbnail,trailText",
            "page-size": MAX_RESULTS_PER_SOURCE
        }
        response = fetch_with_retry("https://content.guardianapis.com/search", params=params, headers={})
        if response:
            data = response.json()
            for article in data.get("response", {}).get("results", []):
                fields = article.get("fields", {})
                results.append({
                    "title": article.get("webTitle", "No title"),
                    "url": article.get("webUrl", ""),
                    "source": "The Guardian",
                    "date": article.get("webPublicationDate", ""),
                    "publisher": "The Guardian",
                    "picture": fields.get("thumbnail", ""),
                    "description": fields.get("trailText", ""),
                    "content": ""
                })
            logger.info(f"Guardian returned {len(results)} articles")
    except Exception as e:
        logger.error(f"Guardian API processing error: {e}")
    return results

def fetch_newsdata(topic):
    """Fetch articles from newsData.io API."""
    logger.info(f"Fetching newsData.io results for: {topic}")
    results = []
    if not NEWSDATA_API_KEY:
        logger.error("newsData.io API key is missing.")
        return results
    try:
        params = {
            "apikey": NEWSDATA_API_KEY,
            "q": topic,
            "language": "en",
            "page": "1"
        }
        response = fetch_with_retry("https://newsdata.io/api/1/news", params=params, headers={})
        if response:
            data = response.json()
            for article in data.get("results", []):
                results.append({
                    "title": article.get("title", "No title"),
                    "url": article.get("link", ""),
                    "source": "newsData.io",
                    "date": article.get("pubDate", ""),
                    "publisher": article.get("source_id", "Unknown"),
                    "picture": article.get("image_url", ""),
                    "description": article.get("description", ""),
                    "content": article.get("content", "")
                })
            logger.info(f"newsData.io returned {len(results)} articles")
    except Exception as e:
        logger.error(f"newsData.io processing error: {e}")
    return results

# Data Science sources (RSS)
def fetch_kdnuggets():
    """Fetch from KDNuggets RSS feed for Data Science."""
    logger.info("Fetching KDNuggets RSS feed")
    results = []
    try:
        feed = feedparser.parse("https://www.kdnuggets.com/feed")
        for entry in feed.entries[:MAX_RESULTS_PER_SOURCE]:
            published = datetime(*entry.published_parsed[:6]) if hasattr(entry, 'published_parsed') else datetime.now()
            results.append({
                "title": entry.title,
                "url": entry.link,
                "source": "KDNuggets",
                "date": published.isoformat(),
                "publisher": "KDNuggets",
                "picture": "",
                "description": entry.description,
                "content": entry.get('content', [{}])[0].get('value', '')
            })
        logger.info(f"KDNuggets returned {len(results)} articles")
    except Exception as e:
        logger.error(f"KDNuggets RSS error: {e}")
    return results

def fetch_datatau():
    """Fetch from DataTau (Hacker News clone for Data Science)."""
    logger.info("Fetching DataTau posts")
    results = []
    try:
        response = requests.get("http://www.datatau.com", timeout=REQUEST_TIMEOUT)
        soup = BeautifulSoup(response.text, 'html.parser')
        for item in soup.select('tr.athing')[:MAX_RESULTS_PER_SOURCE]:
            title_tag = item.find('a', class_='storylink')
            results.append({
                "title": title_tag.text if title_tag else "No title",
                "url": title_tag['href'] if title_tag else "",
                "source": "DataTau",
                "date": datetime.now().isoformat(),
                "publisher": "DataTau",
                "picture": "",
                "description": "",
                "content": ""
            })
        logger.info(f"DataTau returned {len(results)} articles")
    except Exception as e:
        logger.error(f"DataTau error: {e}")
    return results

# AI sources: RSS and NewsAPI
def fetch_syncedreview():
    """Fetch from Synced Review RSS feed for AI."""
    logger.info("Fetching Synced Review RSS feed")
    results = []
    try:
        feed = feedparser.parse("https://syncedreview.com/feed/")
        for entry in feed.entries[:MAX_RESULTS_PER_SOURCE]:
            published = datetime(*entry.published_parsed[:6]) if hasattr(entry, 'published_parsed') else datetime.now()
            results.append({
                "title": entry.title,
                "url": entry.link,
                "source": "Synced Review",
                "date": published.isoformat(),
                "publisher": "Synced Review",
                "picture": "",
                "description": entry.description,
                "content": entry.get('content', [{}])[0].get('value', '')
            })
        logger.info(f"Synced Review returned {len(results)} articles")
    except Exception as e:
        logger.error(f"Synced Review RSS error: {e}")
    return results

def fetch_newsapi(topic):
    """Fetch from NewsAPI.org for AI."""
    logger.info(f"Fetching NewsAPI.org results for: {topic}")
    results = []
    try:
        params = {
            'apiKey': NEWS_API_KEY,
            'q': f"{topic} AI",
            'language': 'en',
            'sortBy': 'publishedAt',
            'pageSize': MAX_RESULTS_PER_SOURCE
        }
        response = requests.get("https://newsapi.org/v2/everything", params=params, timeout=REQUEST_TIMEOUT)
        data = response.json()
        for article in data.get('articles', [])[:MAX_RESULTS_PER_SOURCE]:
            results.append({
                "title": article.get('title', 'No title'),
                "url": article.get('url', ''),
                "source": "NewsAPI.org",
                "date": article.get('publishedAt', ''),
                "publisher": article.get('source', {}).get('name', 'Unknown'),
                "picture": article.get('urlToImage', ''),
                "description": article.get('description', ''),
                "content": article.get('content', '')
            })
        logger.info(f"NewsAPI.org returned {len(results)} articles")
    except Exception as e:
        logger.error(f"NewsAPI.org error: {e}")
    return results

# UI/UX sources: RSS feeds
def fetch_smashingmagazine():
    """Fetch from Smashing Magazine RSS feed for UI/UX."""
    logger.info("Fetching Smashing Magazine RSS feed")
    results = []
    try:
        feed = feedparser.parse("https://www.smashingmagazine.com/feed/")
        for entry in feed.entries[:MAX_RESULTS_PER_SOURCE]:
            published = datetime(*entry.published_parsed[:6]) if hasattr(entry, 'published_parsed') else datetime.now()
            results.append({
                "title": entry.title,
                "url": entry.link,
                "source": "Smashing Magazine",
                "date": published.isoformat(),
                "publisher": "Smashing Magazine",
                "picture": "",
                "description": entry.description,
                "content": entry.get('content', [{}])[0].get('value', '')
            })
        logger.info(f"Smashing Magazine returned {len(results)} articles")
    except Exception as e:
        logger.error(f"Smashing Magazine RSS error: {e}")
    return results

def fetch_uxcollective():
    """Fetch from UX Collective RSS feed for UI/UX."""
    logger.info("Fetching UX Collective RSS feed")
    results = []
    try:
        feed = feedparser.parse("https://uxdesign.cc/feed")
        for entry in feed.entries[:MAX_RESULTS_PER_SOURCE]:
            published = datetime(*entry.published_parsed[:6]) if hasattr(entry, 'published_parsed') else datetime.now()
            results.append({
                "title": entry.title,
                "url": entry.link,
                "source": "UX Collective",
                "date": published.isoformat(),
                "publisher": "UX Collective",
                "picture": "",
                "description": entry.description,
                "content": entry.get('content', [{}])[0].get('value', '')
            })
        logger.info(f"UX Collective returned {len(results)} articles")
    except Exception as e:
        logger.error(f"UX Collective RSS error: {e}")
    return results

# Software Development sources: Hacker News and DEV.to
def fetch_hackernews():
    """Fetch from Hacker News API for Software Development."""
    logger.info("Fetching Hacker News top stories")
    results = []
    try:
        story_ids = requests.get("https://hacker-news.firebaseio.com/v0/topstories.json", timeout=REQUEST_TIMEOUT).json()
        for story_id in story_ids[:MAX_RESULTS_PER_SOURCE]:
            story = requests.get(f"https://hacker-news.firebaseio.com/v0/item/{story_id}.json", timeout=REQUEST_TIMEOUT).json()
            if story.get('type') == 'story' and story.get('url'):
                results.append({
                    "title": story.get('title', 'No title'),
                    "url": story.get('url', ''),
                    "source": "Hacker News",
                    "date": datetime.fromtimestamp(story.get('time', 0)).isoformat(),
                    "publisher": "Hacker News",
                    "picture": "",
                    "description": story.get('text', ''),
                    "content": story.get('text', '')
                })
        logger.info(f"Hacker News returned {len(results)} articles")
    except Exception as e:
        logger.error(f"Hacker News error: {e}")
    return results

def fetch_devto(topic):
    """Fetch from DEV.to API for Software Development."""
    logger.info(f"Fetching DEV.to articles for: {topic}")
    results = []
    try:
        params = {'tag': topic.lower().replace(' ', '-'), 'per_page': MAX_RESULTS_PER_SOURCE}
        headers = {'api-key': DEVTO_API_KEY} if DEVTO_API_KEY else {}
        response = requests.get("https://dev.to/api/articles", params=params, headers=headers, timeout=REQUEST_TIMEOUT)
        for article in response.json()[:MAX_RESULTS_PER_SOURCE]:
            results.append({
                "title": article.get('title', 'No title'),
                "url": article.get('url', ''),
                "source": "DEV.to",
                "date": article.get('published_at', ''),
                "publisher": article.get('user', {}).get('name', 'Unknown'),
                "picture": article.get('cover_image', ''),
                "description": article.get('description', ''),
                "content": article.get('body_html', '')
            })
        logger.info(f"DEV.to returned {len(results)} articles")
    except Exception as e:
        logger.error(f"DEV.to error: {e}")
    return results

# -------------------- Helper Functions --------------------
def filter_recent_items(items):
    """Filter items from the last N days using various date formats."""
    cutoff_date = datetime.now() - timedelta(days=DAYS_BACK)
    recent_items = []
    date_formats = ['%Y-%m-%dT%H:%M:%SZ', '%a, %d %b %Y %H:%M:%S %Z', '%Y-%m-%dT%H:%M:%S%z', '%Y-%m-%d']
    for item in items:
        raw_date = item.get("date", "")
        if not raw_date:
            continue
        parsed_date = None
        for fmt in date_formats:
            try:
                parsed_date = datetime.strptime(raw_date, fmt)
                break
            except ValueError:
                continue
        if not parsed_date:
            try:
                parsed_date = datetime.fromisoformat(raw_date)
            except Exception:
                logger.debug(f"Unparseable date: {raw_date}")
                continue
        if parsed_date > cutoff_date:
            recent_items.append(item)
    return recent_items

def is_english(text):
    """Return True if the detected language is English."""
    try:
        return detect(text) == "en"
    except LangDetectException as e:
        logger.error(f"Language detection failed: {e}")
        return False

def is_relevant(text, topic):
    """Return True if the text contains at least one relevance keyword for the given topic."""
    keywords = {
        "AI": ["artificial intelligence", "machine learning", "deep learning", "neural network", "ai"],
        "Software Development": ["software", "programming", "code", "developer", "development"],
        "Data Science": ["data science", "analytics", "statistics", "data", "machine learning"],
        "UI/UX": ["ui", "ux", "design", "user interface", "user experience"],
        "Web Development": ["web", "website", "frontend", "backend", "development"],
        "Cloud Computing": ["cloud", "aws", "azure", "google cloud", "computing"],
        "Cybersecurity": ["security", "cyber", "hacking", "malware", "encryption"]
    }
    text_lower = text.lower()
    for keyword in keywords.get(topic, []):
        if keyword.lower() in text_lower:
            return True
    return False

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
            "picture": item.get("picture", "")[:500],
            "publisher": item["publisher"][:100],
            "datePublished": pub_date,
            "techAreaId": tech_area_id,
            "createdAt": firestore.SERVER_TIMESTAMP
        }
        doc_ref.set(doc_data)
        logger.info(f"Document created/updated: {doc_id}")
        return True
    except Exception as e:
        logger.error(f"Firestore operation failed: {e}")
        return False

def write_to_csv(items, filename="crawled_content.csv"):
    """Write the crawled items to a CSV file, replacing it if it already exists."""
    fieldnames = [
        "title", "url", "source", "date", "publisher", "picture",
        "description", "full_content", "generated_title", "enhanced_summary", "topic", "api_content"
    ]
    try:
        with open(filename, "w", newline="", encoding="utf-8") as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for item in items:
                writer.writerow({
                    "title": item.get("title", ""),
                    "url": item.get("url", ""),
                    "source": item.get("source", ""),
                    "date": item.get("date", ""),
                    "publisher": item.get("publisher", ""),
                    "picture": item.get("picture", ""),
                    "description": item.get("description", ""),
                    "full_content": item.get("full_content", ""),
                    "generated_title": item.get("generated_title", ""),
                    "enhanced_summary": item.get("enhanced_summary", ""),
                    "topic": item.get("topic", ""),
                    "api_content": item.get("api_content", "")
                })
        logger.info(f"CSV file '{filename}' created successfully.")
    except Exception as e:
        logger.error(f"Failed to write CSV file: {e}")

# -------------------- Main Execution 
def main():
    logger.info("===== Starting content update =====")
    clear_content_collection()
    
    if not all([GNEWS_API_KEY, GUARDIAN_API_KEY, NEWSDATA_API_KEY, NEWS_API_KEY]):
        logger.critical("Missing one or more required API credentials in environment")
        return
    if not check_api_connectivity():
        return
    try:
        tech_area_mapping = get_tech_areas()
        logger.info(f"Valid tech areas: {tech_area_mapping}")
        valid_topics = [topic for topic in UPDATED_TOPICS if topic in tech_area_mapping]
        if not valid_topics:
            logger.error(f"Missing/invalid techArea entries for: {', '.join(UPDATED_TOPICS)}")
            return
        
        csv_items = []
        
        for topic in valid_topics:
            logger.info(f"\nProcessing topic: {topic}")
            tech_area_id = tech_area_mapping[topic]
            try:
                # Common sources
                gnews_items = fetch_gnews(topic)
                guardian_items = fetch_guardian(topic)
                newsdata_items = fetch_newsdata(topic)
                
                # Additional sources per topic
                additional_items = []
                if topic == "Data Science":
                    additional_items += fetch_kdnuggets()
                    additional_items += fetch_datatau()
                elif topic == "AI":
                    additional_items += fetch_syncedreview()
                    additional_items += fetch_newsapi(topic)
                elif topic in ["UI/UX", "Web Development"]:
                    additional_items += fetch_smashingmagazine()
                    additional_items += fetch_uxcollective()
                elif topic == "Software Development":
                    additional_items += fetch_hackernews()
                    additional_items += fetch_devto(topic)
                
                combined = gnews_items + guardian_items + newsdata_items + additional_items
                recent_items = filter_recent_items(combined)[:MAX_ARTICLES_PER_TOPIC]
                logger.info(f"Found {len(recent_items)} recent items for {topic}")
                
                print(f"\n=== Found {len(recent_items)} items for topic: {topic} ===")
                for item in recent_items:
                    print(f"Title: {item.get('title', 'No title')}")
                    print(f"URL: {item.get('url', '')}")
                    print(f"Source: {item.get('source', 'Unknown')}")
                    print(f"Published At: {item.get('date', 'N/A')}")
                    print("-" * 50)
            except Exception as e:
                logger.error(f"Failed to fetch content for {topic}: {e}")
                continue
            
            for item in recent_items:
                try:
                    # Always fetch the full content from the article URL
                    full_content = fetch_full_content(item.get("url", ""))
                    item["full_content"] = full_content
                    # Use the full content as the description for AI enhancement
                    item["description"] = full_content
                    # Preserve any API-provided content if available
                    if item.get("content"):
                        item["api_content"] = item["content"]
                    else:
                        item["api_content"] = full_content

                    # If no picture is provided, choose one randomly from the topic-specific list
                    if not item.get("picture") and topic in PICTURE_LINKS:
                        item["picture"] = random.choice(PICTURE_LINKS[topic])
                    
                    logger.debug(f"Article content for '{item.get('title', '')[:50]}': {item.get('description', '')[:200]}")
                    
                    if not is_english(item.get("description", "")):
                        logger.info(f"Skipping non-English article: {item.get('title')}")
                        continue
                    if not is_relevant(item.get("description", ""), topic):
                        logger.info(f"Skipping irrelevant article for {topic}: {item.get('title')}")
                        continue
                    
                    ai_data = enhance_content_with_ai(item)
                    item.update(ai_data)
                    if item.get("enhanced_summary") == "Summary unavailable":
                        logger.info(f"Skipping article due to unavailable summary: {item.get('title')}")
                        continue
                    if save_to_firestore(item, tech_area_id):
                        logger.info(f"Processed: {item.get('generated_title')[:50]}...")
                        item["topic"] = topic
                        csv_items.append(item)
                    else:
                        logger.warning(f"Failed to save article: {item.get('title')}")
                except Exception as e:
                    logger.error(f"Item processing failed: {e}")
                    continue
                
        write_to_csv(csv_items)
        logger.info("===== Update completed successfully =====")
    except Exception as e:
        logger.critical(f"Fatal error: {e}")
        raise

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        logger.critical(f"Script termination: {e}")
        exit(1)
