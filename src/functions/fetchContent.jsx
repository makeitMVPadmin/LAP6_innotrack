// import { getFirestore, collection, onSnapshot } from "firebase/firestore";
// import { db } from "../../firebase";
// import { useState, useEffect } from "react";

// // Using onSnapshot() instead of getDocs() for real-time updates, ensuring new articles are fetched automatically when updated weekly.

// export const useContentListener = () => {
//   const [contentList, setContentList] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       collection(db, "content"),
//       (querySnapshot) => {
//         const updatedContent = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         console.log("Real-time Content Update:", updatedContent);
//         setContentList(updatedContent);
//       },

//       (error) => {
//         setError(error);
//         console.error("Error fetching content:", error);
//       }
//     );

//     return () => unsubscribe(); // Cleanup function
//   }, []);

//   return { contentList, error };
// };
