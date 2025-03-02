import fetchUsers from "../functions/fetchUsers.js";
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
if (!admin.apps.find((app) => app?.name === "categories-app")) {
    admin.initializeApp(
        {
            credential: admin.credential.cert(serviceAccount),
        },
        "categories-app"
    );
}

const db = admin.apps.find((app) => app?.name === "categories-app").firestore();

const fetchUsersCategories = async ({
    limit = null,
    random = false,
    max = null,
} = {}) => {
    try {
        // Fetch users with optional limits/randomization
        const users = await fetchUsers({ limit, random, max });

        if (users.length === 0) {
            console.log("No users found.");
            return [];
        }

        // Log the users to check their structure
        // console.log("Fetched Users:", users);

        // Fetch categories for each user using their ID
        const categoriesPromises = users.map(async (user) => {
            // Use the user's ID to fetch categories
            const query = db
                .collection("categories")
                .where("userId", "==", user.id);
            const snapshot = await query.get();

            // Only retrieve the names from the categories
            const categories = snapshot.docs.map((doc) => doc.data().name); // Return an array of names

            // Return user's name and associated categories
            return {
                username: user.username || "Unknown User", // Provide a default value if name is undefined
                categories: categories, // Return the array of category names
            };
        });

        // Resolve all category fetches
        const usersWithCategories = await Promise.all(categoriesPromises);

        // Log the users with categories only once
        console.log("Fetched Users with Categories:", usersWithCategories);
        return usersWithCategories;
    } catch (error) {
        console.error("Error fetching users with categories:", error);
        return [];
    }
};

async function fetchCategoriesByUserId(userId) {
    try {
        const query = db.collection("categories").where("userId", "==", userId);
        const snapshot = await query.get();

        if (snapshot.empty) {
            console.log("No categories found for user ID:", userId);
            return [];
        }

        return snapshot.docs.map((doc) => doc.data().name);
    } catch (error) {
        console.error("Error fetching categories for user ID:", userId, error);
        return [];
    }
}

async function test() {
    try {
        // Get only categories of the selected users
        const categories = await fetchUsersCategories({
            limit: 2,
            random: true,
            max: 10,
        });
        //console.log("Categories:", categories);

        // Test fetching categories by user ID
        const userId = "nuglcztcNzLlTgsysmYB"; // Replace with actual user ID
        const userCategories = await fetchCategoriesByUserId(userId);
        console.log(`Categories for user ${userId}:`, userCategories);
    } catch (error) {
        console.error("Test error:", error);
    }
}

test();

export default { fetchUsersCategories, fetchCategoriesByUserId };
