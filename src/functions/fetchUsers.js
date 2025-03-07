import { db } from "../../firebase";
import { collection, query, getDocs, limit } from "firebase/firestore";

const fetchUsers = async ({
    limit: userLimit = null,
    random = false,
    max = null,
} = {}) => {
    try {
        let usersQuery = collection(db, "users");

        // If max is specified and we don't need random ordering,
        // we can limit at the query level for better performance
        if (max && !random) {
            usersQuery = query(usersQuery, limit(max));
        }

        const snapshot = await getDocs(usersQuery);

        if (snapshot.empty) {
            console.log("No users found.");
            return [];
        }

        let users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        // If random is true, shuffle the array
        if (random) {
            users = users.sort(() => Math.random() - 0.5);
            // Apply max limit after randomization if specified
            if (max) {
                users = users.slice(0, max);
            }
        }

        // Apply limit if specified (limit takes precedence over max)
        return userLimit
            ? users.slice(0, Math.min(limit, max || limit))
            : users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

async function test() {
    try {
        // Get 3 random users from a max of n users
        const randomUsers = await fetchUsers({
            limit: 5,
            random: true,
            max: 20,
        });
        console.log("5 random users from max}:", randomUsers);
    } catch (error) {
        console.error("Test error:", error);
    }
}

// test();

export default fetchUsers;
