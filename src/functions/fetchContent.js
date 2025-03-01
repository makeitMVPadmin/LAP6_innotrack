import admin from "firebase-admin";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { errorMonitor } from "events";

const __dirname = dirname(fileURLToPath(import.meta.url));
// Initialize Firebase Admin SDK using the JSON file
const serviceAccount = join(
    __dirname,
    "../../launchacademyp6-firebase-adminsdk-fbsvc-f4e991968e.json"
);
// Initialize with a unique name
if (!admin.apps.find((app) => app?.name === "content-app")) {
    admin.initializeApp(
        {
            credential: admin.credential.cert(serviceAccount),
        },
        "content-app"
    );
}
const db = admin.apps.find((app) => app?.name === "content-app").firestore();

export default async function fetchContent(contentId) {
    try {
        const contentDocRef = db.collection("content").doc(contentId);
        const contentDoc = await contentDocRef.get();

        if (!contentDoc.exists) {
            throw new Error(`Content with ID ${contentId} not found`);
            return {};
        }
        const content = contentDoc.data();

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

test();
