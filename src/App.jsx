import { createContext, useState } from "react";

import "./App.css";
import AddBookmark from "./components/AddBookmark";
import ContentCard from "./components/ContentCard";

export const TechAreaContext = createContext("all");

function App() {
  
    const [techArea, setTechArea] = useState("all");

  return (
    <TechAreaContext.Provider value={[techArea, setTechArea]}>
      <ContentCard></ContentCard>
      <AddBookmark></AddBookmark>
    </TechAreaContext.Provider>
  );
}

export default App;
