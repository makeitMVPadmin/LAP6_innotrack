import { useState } from "react";

import "./App.css";
import AddBookmark from "./components/AddBookmark";
import ContentCard from "./components/ContentCard";
import TechAreaTab from "./components/TechAreaTab";
import ContentList from "./components/ContentList";
// import fetchUsers from "./functions/fetchUsers";

const hardCodedTechAreas = [
  { id: "all", name: "All" },
  { id: "ai", name: "AI" },
  { id: "cloudcomp", name: "Cloud Computing" },
  { id: "webdev", name: "Web Development" },
  { id: "datasc", name: "Data Science" },
];

function App() {
  const [selectedTabId, setSelectedTabId] = useState("all");

  return (
    <>
      <TechAreaTab
        techAreas={hardCodedTechAreas}
        selectedTabId={selectedTabId}
        onTabChange={setSelectedTabId}
      ></TechAreaTab>
      <ContentCard></ContentCard>
      <AddBookmark></AddBookmark>
      <ContentList></ContentList>
      {/* <fetchUsers></fetchUsers> */}
    </>
  );
}

export default App;
