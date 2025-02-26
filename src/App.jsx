import { useState } from "react";
import Header from "./components/Header";
import { AppProvider } from "./AppContext";
import CustomCarousel from "./components/Carousel";

function App() {
    const imageUrl = "./src/assets/BGimage.png";

    return (
        <>
            <AppProvider>
                <Header />
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
