import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

async function fetchContent(contentId) {
    try {
        const contentDocRef = doc(db, "content", contentId);
        const contentSnapshot = await getDoc(contentDocRef);

        if (!contentSnapshot.exists) {
            throw new Error(`Content with ID ${contentId} not found`);
            return {};
        }
        const content = contentSnapshot.data();

        return content;
    } catch (error) {
        console.log("Error fetching content: ", error);
    }
}

async function test() {
    try {
        const testContentId = "6c78c10f8d1855824c31";

        const content = await fetchContent(testContentId);

        console.log("\n=== Starting fetch Content Test ===\n");
        console.log("Retrieved content: \n", content);
        console.log("\n=== fetch Content Test Completed ===\n");
    } catch (error) {
        console.error("Test failed with error:", error);
        throw error;
    }
}

export { fetchContent };
//test();
