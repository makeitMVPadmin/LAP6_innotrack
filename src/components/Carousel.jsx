import { useAppContext } from "../AppContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Summary from "./Summary";

const CustomCarousel = () => {
  const { content } = useAppContext();

  if (content.length === 0) return <p>Loading...</p>;

  return (
    <Carousel className="w-[100%] max-w-4xl mx-auto">
      <CarouselContent>
        {content.map((item) => (
          <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 p-4">
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
            <Summary content={item.summary}/>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CustomCarousel;
