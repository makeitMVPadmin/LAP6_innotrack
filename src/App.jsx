import { AppProvider } from "./AppContext";
import CustomCarousel from "./components/Carousel";

function App() {
  return (
    <AppProvider>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <CustomCarousel />
      </div>
    </AppProvider>
  );
}

export default App;
