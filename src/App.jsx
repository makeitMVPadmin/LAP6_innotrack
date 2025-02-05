import { useState } from "react";

import "./App.css";
import AddBookmark from "./components/AddBookmark";
import ContentCard from "./components/ContentCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ContentCard></ContentCard>
      <AddBookmark></AddBookmark>
    </>
  );
}

export default App;
