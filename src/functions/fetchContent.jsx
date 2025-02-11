import { db, collection, getDocs } from "../firebaseConfig";

export const fetchContent = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "content"));
    const contentList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return contentList;
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
};
