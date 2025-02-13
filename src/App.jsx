import { useState } from "react";

import "./App.css";
import AddBookmark from "./components/AddBookmark";
import ContentCard from "./components/ContentCard";
import TechAreaTab from "./components/TechAreaTab";
import ContentList from "./components/ContentList";
import UserList from "./components/UserList";
import { AppProvider } from "./AppContext";
import CustomCarousel from "./components/Carousel";
// import Carousel from "./components/Carousel";
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
    <AppProvider>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <CustomCarousel />
      </div>
      {/* <ContentList></ContentList> */}
      <UserList></UserList>

      {/* <TechAreaTab
        techAreas={hardCodedTechAreas}
        selectedTabId={selectedTabId}
        onTabChange={setSelectedTabId}
      ></TechAreaTab>
      <ContentCard></ContentCard>
      <AddBookmark></AddBookmark>
      <ContentList></ContentList>
      <UserList></UserList> */}
      {/* <fetchUsers></fetchUsers> */}
    </AppProvider>
  );
}

export default App;
