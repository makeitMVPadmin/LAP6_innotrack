import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Bookmark, Share2, ChevronDown, ChevronUp } from "lucide-react";

export default function ContentCard() {
  //   const [content, setContent] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Simulated list of cards
  const contentList = [
    {
      createdAt: "July 1, 2024 at 4:00:46 AM UTC-4",
      datePublished: "July 15, 2024 at 12:13:31 PM UTC-4",
      picture: "https://placehold.co/600x400?text=Card+1",
      publisher: "Buchanan, Welch and Morton",
      summary: "Activity him energy goal soon cultural more.",
      techAreaId: "JokIHcJYvejBkHCSPMx9",
      techAreaName: "AI",
      title: "Card 1: People finally among how camera.",
    },
    {
      createdAt: "July 2, 2024 at 4:30:12 AM UTC-4",
      datePublished: "July 16, 2024 at 11:45:10 AM UTC-4",
      picture: "https://placehold.co/600x400?text=Card+2",
      publisher: "TechWorld Inc.",
      summary: "A new breakthrough in AI technology has emerged.",
      techAreaId: "AIBc123",
      techAreaName: "AI",
      title: "Card 2: AI Breakthrough",
    },
    {
      createdAt: "July 3, 2024 at 9:15:25 AM UTC-4",
      datePublished: "July 17, 2024 at 2:30:45 PM UTC-4",
      picture: "https://placehold.co/600x400?text=Card+3",
      publisher: "Science Today",
      summary: "Exploring the future of quantum computing.",
      techAreaId: "QuantumXYZ",
      techAreaName: "Quantum Computing",
      title: "Card 3: The Quantum Leap",
    },
  ];

  const handleNextClick = () => {
    if (currentIndex < contentList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const content = contentList[currentIndex];
  return (
    <div className="w-screen h-full">
      <Card className="h-full w-5/6">
        <img
          src={
            content?.picture || "https://placehold.co/600x400?text=Place+Holder"
          }
          alt="Article cover"
          className="w-full h-48 object-cover"
        />
        <CardHeader className="text-left">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-medium">
              Technology
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark
                  className={`h-4 w-4 ${
                    isBookmarked ? "text-red-500 fill-current" : ""
                  }`}
                />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardTitle className="text-left">
            {content?.title || "Untitled"}
          </CardTitle>
          <CardDescription className="text-left">
            {content?.publisher || "Unknown Author"}
          </CardDescription>
        </CardHeader>
        {isExpanded && (
          <CardContent className="space-y-4 text-left">
            <div className="space-y-2">
              <hr />
              <h3 className="font-semibold">Summary</h3>
              <p className="text-muted-foreground">
                {content?.summary || "This is an empty summary."}
              </p>
            </div>

            <div className="space-y-2">
              <hr />
              <p className="text-muted-foreground">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </CardContent>
        )}

        <CardFooter>
          <Button
            variant="ghost"
            className="w-full flex items-center gap-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                Read Less
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Read More
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
        <div className="flex justify-between p-4">
          <Button onClick={handlePreviousClick} disabled={currentIndex === 0}>
            Back
          </Button>
          <span className="text-muted-foreground">{`${currentIndex + 1} / ${
            contentList.length
          }`}</span>
          <Button
            onClick={handleNextClick}
            disabled={currentIndex === contentList.length - 1}
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
}
