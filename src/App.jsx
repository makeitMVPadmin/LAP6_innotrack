import { useState } from "react";

import AddBookmark from "./components/AddBookmark";
// import ContentCard from "./components/ContentCard";
import TechAreaTab from "./components/TechAreaTab";
// import ContentList from "./components/ContentList";

import { AppProvider } from "./AppContext";
import CustomCarousel from "./components/Carousel";
import NewCollectionPopup from "./components/NewCollectionPopup";
import Bookmark from "./components/Bookmark";
import { Button } from "@/components/ui/button";

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
    const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsBookmarkOpen(true)}>
                Bookmark Icon
            </Button>
            {isBookmarkOpen && (
                <Bookmark
                    contentInfo={mockInfoFromCarousel}
                    onDone={() => setIsBookmarkOpen(false)}
                />
            )}
            {/* <AppProvider>
                <div className="flex justify-center items-center min-h-screen bg-gray-100">
                    <CustomCarousel />
                </div>
            </AppProvider> */}
        </>
    );
}

export default App;
