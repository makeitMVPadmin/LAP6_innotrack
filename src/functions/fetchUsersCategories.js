import { db } from "../../firebase";
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";
import fetchUsers from "./fetchUsers";

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
            const categoriesQuery = query(
                collection(db, "categories"),
                where("userId", "==", user.id)
            );
            const snapshot = await getDocs(categoriesQuery);

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

const fetchCategoriesByUserId = async (userId) => {
    try {
        const categoriesQuery = query(
            collection(db, "categories"),
            where("userId", "==", userId)
        );
        const snapshot = await getDocs(categoriesQuery);

        if (snapshot.empty) {
            console.log("No categories found for user ID:", userId);
            return [];
        }

        return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
        console.error("Error fetching categories for user ID:", userId, error);
        return [];
    }
};

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

export { fetchUsersCategories, fetchCategoriesByUserId };
