import { useState } from "react";

import "./App.css";
import AddBookmark from "./components/AddBookmark";
import ContentCard from "./components/ContentCard";
import TechAreaTab from "./components/TechAreaTab";

const hardCodedTechAreas = [
    { id: 1, name: "AI" },
    { id: 2, name: "Cloud Computing" },
    { id: 2, name: "Cloud Computing" },
    { id: 4, name: "Data Science" },
];

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <TechAreaTab techAreas={hardCodedTechAreas}></TechAreaTab>
            <ContentCard></ContentCard>
            <AddBookmark></AddBookmark>
        </>
    );
}

export default App;
