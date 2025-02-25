import { useAppContext } from "../AppContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const CustomCarousel = () => {
  const { content, setCurrentIndex } = useAppContext();

  const [api, setApi] = useState();
 
  useEffect(() => {
    if (!api) {
      return
    }
 
    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap())
    })
  }, [api])

  if (content.length === 0) return <p>Loading...</p>;

  return (
    <Carousel setApi={setApi} className="w-[100%] max-w-4xl mx-auto h-fit pt-[2.25rem]">
      <CarouselContent>
        {content.map((item, index) => (
          <CarouselItem key={item.id} index={index} className="basis:1/1 p-4">
            <div className="border rounded-lg shadow-md p-4">
              <img
                src={item.picture}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md mt-2"
              />
              <h1 className="text-xl font-semibold">{item.title}</h1>
              <p className="text-gray-600">{item.publisher}</p>
              <p className="text-gray-600">{item.summary}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CustomCarousel;
