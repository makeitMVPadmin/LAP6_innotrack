import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [content, setContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchContent = async () => {
      const querySnapshot = await getDocs(collection(db, "content"));
      const contentData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContent(contentData);
    };

    fetchContent();
  }, []);

  return (
    <AppContext.Provider value={{ content, currentIndex, setCurrentIndex }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
