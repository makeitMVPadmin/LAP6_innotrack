import { useState } from "react";
import Header from "./components/Header";
import { AppProvider } from "./AppContext";
import CustomCarousel from "./components/Carousel";
import Summary from "./components/Summary";
import { toast, Toaster } from "sonner";
import imageUrl from "./assets/BackgroundImage.png";

function App() {
    //const imageUrl = "./src/assets/BackgroundImage.png";

    return (
        <AppProvider>
            <Header />
            <main
                className="bg-transparent pb-[1rem]"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <CustomCarousel />
                <Summary />
                <Toaster richColors limit={1} />
            </main>
        </AppProvider>
    );
}

export default App;
