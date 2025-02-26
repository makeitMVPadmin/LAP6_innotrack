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
            className="w-[100%] max-w-4xl mx-auto h-fit pt-[2.25rem]"
        >
            <CarouselContent>
                {content.map((item, index) => (
                    <CarouselItem
                        key={item.id}
                        index={index}
                        className="basis:1/1 p-4"
                    >
                        <div className="border rounded-lg shadow-md p-4">
                            <img
                                src={item.picture}
                                alt={item.title}
                                className="w-full h-48 object-cover rounded-md mt-2"
                            />
                            <div className="flex justify-between">
                                <h1 className="text-xl font-semibold">
                                    {item.title}
                                </h1>
                                <Bookmark contentInfo={item.id} />
                            </div>
                            <p className="text-gray-600">{item.publisher}</p>
                            <p className="text-gray-600">{item.summary}</p>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="static flex mt-[1.5rem] justify-center gap-11">
                <CarouselPrevious className="static translate-none" />
                <p className="font-fraunces flex gap-6 text-xl">
                    <span className="font-inter font-semibold">
                        {currentIndex + 1}
                    </span>{" "}
                    of <span className="font-inter font-semibold">{count}</span>
                </p>
                <CarouselNext className="static translate-none" />
            </div>
        </Carousel>
    );
};

export default CustomCarousel;
