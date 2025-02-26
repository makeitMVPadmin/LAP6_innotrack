import { useAppContext } from "../AppContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import Summary from "./Summary";
import Bookmark from "./Bookmark";

const CustomCarousel = () => {
  const { content, currentIndex, setCurrentIndex } = useAppContext();
  const [api, setApi] = useState(null);

  // **Fix: Index not updating when clicking next**
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap() + 1);
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (content.length === 0) return <p>Loading...</p>;

  return (
    <Carousel className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <CarouselContent>
        {content.map((item) => (
          <CarouselItem
            key={item.id}
            className="relative rounded-[7.869px] 
            border-t-[0.997px] border-r-[1.994px] border-b-[1.994px] border-l-[0.997px] border-[#182127]
            shadow-[0px_0.997px_1.994px_0px_rgba(0,0,0,0.05)]
            bg-white overflow-hidden"
          >
            <div className="relative">
              <img
                src={item.picture}
                alt={item.title}
                className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover rounded-t-[7.869px]"
              />

              <div className="relative bg-[#EBF1F6]">
                <div className="absolute top-2 right-2 flex items-center gap-2">
                  <Bookmark contentInfo={item.id} />
                </div>
                <h1 className="text-lg sm:text-xl font-bold">{item.title}</h1>
                <p className="text-sm sm:text-base font-semibold">
                  {item.publisher}
                </p>
                {/* <p className="text-gray-600">{item.summary}</p> */}
                {/* Read More Button */}
                <button className="mt-2 sm:mt-4 bg-yellow-400 text-black font-medium px-4 py-2 rounded-md shadow-md hover:bg-yellow-500 transition">
                  Read More
                </button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* **Fix: Navigation Controls Below Content** */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <CarouselPrevious />
        <span className="text-lg font-medium">
          {currentIndex} of {content.length}
        </span>
        <CarouselNext />
      </div>
    </Carousel>
  );
};

export default CustomCarousel;
