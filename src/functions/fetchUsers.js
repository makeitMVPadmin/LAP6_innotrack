// import admin from 'firebase-admin';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// // Initialize Firebase Admin SDK using the JSON file
// const serviceAccount = join(__dirname, '../../launchacademyp6-firebase-adminsdk-fbsvc-f4e991968e.json');

// // Initialize with a unique name
// if (!admin.apps.find(app => app?.name === 'users-app')) {
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount)
//     }, 'users-app');
// }

// const db = admin.apps.find(app => app?.name === 'users-app').firestore();

// const fetchUsers = async ({ limit = null, random = false, max = null } = {}) => {
//     try {
//         let query = db.collection("users");

//         // If max is specified and we don't need random ordering,
//         // we can limit at the query level for better performance
//         if (max && !random) {
//             query = query.limit(max);
//         }

//         const snapshot = await query.get();

//         if (snapshot.empty) {
//             console.log("No users found.");
//             return [];
//         }

//         let users = snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         }));

//         // If random is true, shuffle the array
//         if (random) {
//             users = users.sort(() => Math.random() - 0.5);
//             // Apply max limit after randomization if specified
//             if (max) {
//                 users = users.slice(0, max);
//             }
//         }

//         // Apply limit if specified (limit takes precedence over max)
//         return limit ? users.slice(0, Math.min(limit, max || limit)) : users;
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         return [];
//     }
// };

// async function test() {
//     try {
//         // Get all users (max n users)
//         // const allUsers = await fetchUsers({ max: 10 });
//         // console.log('All users (max 10):', allUsers);

//         // Get first n users
//         // const firstFiveUsers = await fetchUsers({ limit: 5, max: 10 });
//         // console.log('First 5 users:', firstFiveUsers);

//         // Get 3 random users from a max of n users
//         const randomUsers = await fetchUsers({ limit: 5, random: true, max: 20 });
//         console.log('5 random users from max}:', randomUsers);
//     } catch (error) {
//         console.error('Test error:', error);
//     }
// }

// test();

// export default fetchUsers;

//*************************************************************************************** */
//THIS is NYAJAL testing to see users with changes made to firebase.js
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from "react";

export const useUsersListener = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (querySnapshot) => {
        const userList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Real-time Users Update:", userList);
        setUsers(userList);
      },
      (error) => {
        setError(error);
        console.error("Error fetching users:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return { users, error };
};
