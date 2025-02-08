import { useState } from "react";

import "./App.css";
import AddBookmark from "./components/AddBookmark";
import ContentCard from "./components/ContentCard";
import TechAreaTab from "./components/TechAreaTab";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <TechAreaTab></TechAreaTab>
            <ContentCard></ContentCard>
            <AddBookmark></AddBookmark>
        </>
    );
}

export default App;
