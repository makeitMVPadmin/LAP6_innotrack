import fetchCategoriesByUserId from "./fetchUsersCategories.js";
import admin from "firebase-admin";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize Firebase Admin SDK using the JSON file
const serviceAccount = join(
    __dirname,
    "../../launchacademyp6-firebase-adminsdk-fbsvc-f4e991968e.json"
);

// Initialize with a unique name
if (!admin.apps.find((app) => app?.name === "create-category-app")) {
    admin.initializeApp(
        {
            credential: admin.credential.cert(serviceAccount),
        },
        "create-category-app"
    );
}

const db = admin.apps
    .find((app) => app?.name === "create-category-app")
    .firestore();

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: "true",
        timeZoneName: "shortOffset",
    };
    return date.toLocaleString("en-US", options);
}

export default async function createNewCategory(categoryInfo) {
    try {
        //Generate a new document reference to get an auto-generated ID
        const categoryRef = db.collection("categories").doc();

        //create the category object
        const newCategory = {
            id: categoryRef.id,
            userId: categoryInfo.userID,
            contenIds: [],
            name: categoryInfo.name,
            createdAt: formatDate(categoryInfo.createdAt),
        };

        //write to firestore
        await categoryRef.set(newCategory);

        console.log("Created new category: ", newCategory);
        return newCategory;
    } catch (error) {
        console.log("Error creating new category: ", error);
    }
}

async function test() {
    try {
        const testUserId = "g0NqCiQXvGyueTJo8b8z"; //username: jerryjohnson
        const testCategoryInfo = {
            userID: testUserId,
            name: "AInews",
            createdAt: Date.now(),
        };
        //write to firestore, this function prints
        const newCat = await createNewCategory(testCategoryInfo);

        //fetch all categories to verify creation, this function prints
        // **Error: fetchCategoriesByUserId is not a function?
        // const userCategories = await fetchCategoriesByUserId(testUserId);

        //verify that new category is in results
        // const foundCategory = userCategories.find(
        //     (cat) => cat.id === newCat.id
        // );
        // if (foundCategory) {
        //     console.log(
        //         "Test passed: Category was successfully created and retrieved"
        //     );
        // } else {
        //     console.log(
        //         "Test failed: Created category was not found in database"
        //     );
        // }
    } catch (error) {
        console.error("Test failed with error:", error);
    }
}

test();
