import { useState } from "react";

import "./App.css";
import AddBookmark from "./components/AddBookmark";
// import ContentCard from "./components/ContentCard";
import TechAreaTab from "./components/TechAreaTab";
import Header from "./components/Header";
// import ContentList from "./components/ContentList";

import { AppProvider } from "./AppContext";
import CustomCarousel from "./components/Carousel";

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
        <Header />

        <CustomCarousel />
      </div>
    </AppProvider>
  );
}

export default App;
