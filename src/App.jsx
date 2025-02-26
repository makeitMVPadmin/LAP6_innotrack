import { useState } from "react";

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
const mockInfoFromCarousel = {
    currContentId: "magPC2025asusROG",
    userId: "dNC63cyuDbEoEntxBpe9",
};

function App() {
    const imageUrl = "./src/assets/BGimage.png";

    return (
        <>
            <AppProvider>
                <Header />
                {/* <Bookmark contentInfo={mockInfoFromCarousel} /> */}
                <div
                    className="flex justify-center items-center min-h-screen bg-transparent"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <CustomCarousel />
                </div>
            </AppProvider>
        </>
    );
}

export default App;
