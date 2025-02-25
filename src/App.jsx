import { useState } from "react";
import AddBookmark from "./components/AddBookmark";
// import ContentCard from "./components/ContentCard";
import TechAreaTab from "./components/TechAreaTab";
import Header from "./components/Header";
// import ContentList from "./components/ContentList";
import { AppProvider } from "./AppContext";
import CustomCarousel from "./components/Carousel";
import Summary from "./components/Summary";

function App() {
  const imageUrl = "./src/assets/BGimage.png";

  return (
    <AppProvider>
      <Header />
      <main
        className="bg-transparent"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <CustomCarousel />
        <Summary />
      </main>
    </AppProvider>
  );
}

export default App;
