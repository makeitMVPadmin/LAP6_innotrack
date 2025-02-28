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
import { Button } from "@/components/ui/button";
import { Skeleton } from "./ui/skeleton";

const CustomCarousel = () => {
    const { content, currentIndex, setCurrentIndex } = useAppContext();

    const [api, setApi] = useState();

    useEffect(() => {
        if (!api) {
            return;
        }

        api.on("select", () => {
            setCurrentIndex(api.selectedScrollSnap());
        });
    }, [api]);

    // if (content.length === 0) return <p>Loading...</p>;

    return (
        <Carousel
            setApi={setApi}
            className="w-[100%] max-w-3xl mx-auto h-fit pt-[2.25rem]"
        >
            <CarouselContent>
                {content.length ? content.map((item, index) => (
                    <CarouselItem
                        key={item.id}
                        index={index}
                        className="basis:1/1"
                    >
                        <div className="rounded-[7.869px] border-t-[0.997px] border-r-[1.994px] border-b-[1.994px] border-l-[0.997px] border-[#182127] shadow-[0px_0.997px_1.994px_0px_rgba(0,0,0,0.05) bg-white overflow-hidden ">
                            <img
                                src={item.picture}
                                alt={item.title}
                                className="w-full aspect-[56/25] object-cover rounded-t-[7.869px]"
                            />
                            <div className="p-2 pt-4 bg-[#EBF1F6] min-h-[9rem]">
                                <div className="flex justify-between">
                                    <h1 className="text-xl sm:text-3xl  font-semibold line-clamp-2">
                                        {item.title}
                                    </h1>
                                    <Bookmark contentInfo={item} />
                                </div>

                                <p className="text-base sm:text-lg pt-2 pb-1">
                                    {item.publisher}
                                </p>

                                {/* <Button
                    className="absolute bottom-[-0.625rem] right-1 text-[#28363F] bg-yellow-400 
    hover:bg-yellow-500 border-black border-l border-t border-r-2 
    border-b-2 rounded-lg shadow-customButton transition"
                  >
                    Read More
                  </Button> */}
                            </div>
                        </div>
                    </CarouselItem>
                )) :
                    <CarouselItem>
                        <Skeleton className="rounded-[7.869px] border-t-[0.997px] border-r-[1.994px] border-b-[1.994px] border-l-[0.997px] border-[#182127] shadow-[0px_0.997px_1.994px_0px_rgba(0,0,0,0.05) overflow-hidden h-[30.5rem]"/>
                    </CarouselItem>
                }
            </CarouselContent>
            <div className="static flex mt-[1rem] justify-center gap-11">
                <CarouselPrevious className="static translate-none" />
                {content.length ? <p className="font-fraunces flex gap-6 text-xl">
                    <span className="font-inter font-semibold">
                        {currentIndex + 1}
                    </span>
                    of <span className="font-inter font-semibold">{content.length}</span>
                </p> : <Skeleton className="h-[2rem] w-[5.4rem]"/>}
                <CarouselNext className="static translate-none" />
            </div>
        </Carousel>
    );
};

export default CustomCarousel;
