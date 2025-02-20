import { useState } from "react";

import "./App.css";
import AddBookmark from "./components/AddBookmark";
// import ContentCard from "./components/ContentCard";
import TechAreaTab from "./components/TechAreaTab";
<<<<<<< HEAD
import Header from "./components/Header";
=======
// import ContentList from "./components/ContentList";

import { AppProvider } from "./AppContext";
import CustomCarousel from "./components/Carousel";
>>>>>>> develop

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
<<<<<<< HEAD
    <>
      <Header />
      <TechAreaTab
        techAreas={hardCodedTechAreas}
        selectedTabId={selectedTabId}
        onTabChange={setSelectedTabId}
      ></TechAreaTab>
      <ContentCard></ContentCard>
      <AddBookmark></AddBookmark>
    </>
=======
    <AppProvider>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <CustomCarousel />
      </div>
    </AppProvider>
>>>>>>> develop
  );
}

export default App;
