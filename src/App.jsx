import { useState } from "react";
import Header from "./components/Header";
import { AppProvider } from "./AppContext";
import CustomCarousel from "./components/Carousel";
import Summary from "./components/Summary";
import { toast, Toaster } from "sonner";

function App() {
    const imageUrl = "./src/assets/BackgroundImage.png";

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
                <Toaster richColors limit={1} />
            </main>
        </AppProvider>
    );
}

export default App;
