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

const CustomCarousel = () => {
  const { content, currentIndex, setCurrentIndex } = useAppContext();
  const [api, setApi] = useState(null);

  //The Index is NOT updating when you click on the next button**
  // useEffect(() => {
  //   if (!api) return;

  //   // Update the index whenever the slide changes
  //   const onSelect = () => {
  //     setCurrentIndex(api.selectedScrollSnap() + 1);
  //   };

  //   api.on("select", onSelect);

  //   onSelect();

  //   return () => {
  //     api.off("select", onSelect);
  //   };
  // }, [api]);

  if (content.length === 0) return <p>Loading...</p>;

  return (
    <Carousel className="w-[100%] max-w-4xl mx-auto flex flex-col items-center">
      <CarouselContent>
        {content.map((item) => (
          <CarouselItem
            key={item.id}
            className="rounded-[7.869px] 
  border-t-[0.997px] border-r-[1.994px] border-b-[1.994px] border-l-[0.997px] border-[#182127]
  shadow-[0px_0.997px_1.994px_0px_rgba(0,0,0,0.05)]"
          >
            <div>
              <img
                src={item.picture}
                alt={item.title}
                className="w-full object-cover rounded-md"
              />
              <div className="bg-[#EBF1F6]">
                <h1 className="text-xl font-semibold">{item.title}</h1>
                <p className="text-gray-600">{item.publisher}</p>
                <p className="text-gray-600">{item.summary}</p>
              </div>
            </div>
            {/* <Summary content={item.summary} /> */}
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Moved Navigation buttons below the CarouselContent */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <CarouselPrevious />
        <span className="text-lg font-medium">
          {/** The Index is NOT updating when you click on the next button */}
          {currentIndex} of {content.length}
        </span>
        <CarouselNext />
      </div>
    </Carousel>
  );
};

export default CustomCarousel;
