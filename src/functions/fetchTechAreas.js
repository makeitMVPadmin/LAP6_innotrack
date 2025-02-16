import admin from "firebase-admin";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
// Initialize Firebase Admin SDK using the JSON file
const serviceAccount = join(
    __dirname,
    "../../launchacademyp6-firebase-adminsdk-fbsvc-4d74144034.json"
);
// Initialize with a unique name
if (!admin.apps.find((app) => app?.name === "tech-areas-app")) {
    admin.initializeApp(
        {
            credential: admin.credential.cert(serviceAccount),
        },
        "tech-areas-app"
    );
}
const db = admin.apps.find((app) => app?.name === "tech-areas-app").firestore();

export default async function fetchTechAreas() {
    try {
        const techAreaCollectionRef = db.collection("techArea");
        const snapshot = await techAreaCollectionRef.get();

        if (snapshot.empty) {
            console.log("No tech areas found");
            return [];
        }
        const techAreas = snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
        }));
        console.log(techAreas);
        return techAreas;
    } catch (error) {
        console.log("Error fetching tech areas: ", error);
        return [];
    }
}
fetchTechAreas();
