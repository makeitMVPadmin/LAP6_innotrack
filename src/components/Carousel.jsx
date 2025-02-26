import { useAppContext } from "../AppContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Bookmark from "./Bookmark";

const CustomCarousel = () => {
  const { content, currentIndex, setCurrentIndex } = useAppContext();

  const [api, setApi] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  if (content.length === 0) return <p>Loading...</p>;

  return (
    <Carousel
      setApi={setApi}
      className="w-[100%] max-w-2xl mx-auto h-fit pt-[2.25rem]"
    >
      <CarouselContent>
        {content.map((item, index) => (
          <CarouselItem key={item.id} index={index} className="basis:1/1 p-4">
            <div className="rounded-[7.869px] border-t-[0.997px] border-r-[1.994px] border-b-[1.994px] border-l-[0.997px] border-[#182127] shadow-[0px_0.997px_1.994px_0px_rgba(0,0,0,0.05) bg-white overflow-hidden ">
              <img
                src={item.picture}
                alt={item.title}
                className="w-full aspect-[56/25] object-cover rounded-t-[7.869px]"
              />
              <div className="p-2 bg-[#EBF1F6] min-h-[9rem]">
                <div className="flex justify-between">
                  <h1 className="text-xl font-semibold">{item.title}</h1>
                  <Bookmark contentInfo={item.id} />
                </div>

                <div className="flex justify-between">
                  <div>
                    <p className="text-sm sm:text-base">{item.publisher}</p>
                  </div>
                  <button className="mt-2 sm:mt-4 bg-yellow-400 text-black font-medium px-4 py-2 rounded-md shadow-md hover:bg-yellow-500 transition">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="static flex mt-[1rem] justify-center gap-11">
        <CarouselPrevious className="static translate-none" />
        <p className="font-fraunces flex gap-6 text-xl">
          <span className="font-inter font-semibold">{currentIndex + 1}</span>{" "}
          of <span className="font-inter font-semibold">{count}</span>
        </p>
        <CarouselNext className="static translate-none" />
      </div>
    </Carousel>
  );
};

export default CustomCarousel;
