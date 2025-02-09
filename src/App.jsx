import { createContext, useState } from "react";

import "./App.css";
import AddBookmark from "./components/AddBookmark";
import ContentCard from "./components/ContentCard";

export const TechAreaContext = createContext(null);

function App() {
    const [contents, setContents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cardIndex, setCardIndex] = useState(0);

  return (
    <TechAreaContext.Provider value={{contents, categories, cardIndex, setCardIndex}}>
      <ContentCard></ContentCard>
      <AddBookmark></AddBookmark>
    </TechAreaContext.Provider>
  );
}

export default App;
