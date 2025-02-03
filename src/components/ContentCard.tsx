import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Bookmark, Share2, ChevronDown, ChevronUp } from "lucide-react";

export default function ContentCard() {
    const [content, setContent] = useState({});
    const [isExpanded, setIsExpanded] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    useEffect(()=>{
        // to do get content from backend
        const dummyContent = {
            "createdAt":"July 1, 2024 at 4:00:46 AM UTC-4",
            "datePublished": "July 15, 2024 at 12:13:31 PM UTC-4",
            "picture":"https://placehold.co/600x400?text=Place+Holder",
            "publisher":"Buchanan, Welch and Morton",
            "summary":"Activity him energy goal soon cultural more.",
            "techAreaId":"JokIHcJYvejBkHCSPMx9",
            "techAreaName": "AI",
            "title":"People finally among how camera."
        }
        setContent(dummyContent);
    }, [])

    return (
        <div className="w-screen h-full">
        
            <Card className="h-full w-full">
                <img 
                    src={content?.picture || "https://placehold.co/600x400?text=Place+Holder"}
                    alt="Article cover"
                    className="w-full h-48 object-cover"
                />
                <CardHeader>
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
                        <Bookmark className={`h-4 w-4 ${isBookmarked ? "text-red-500 fill-current" : ""}`} />
                        </Button>
                        <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                    </div>
                <CardTitle>{content?.title || "Untitled"}</CardTitle>
                <CardDescription>{content?.publisher || "Unknown Author"}</CardDescription>
                </CardHeader>
                {isExpanded && (
                    <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Summary</h3>
                        <p className="text-muted-foreground">
                        Artificial Intelligence is revolutionizing the way we approach software development...
                        </p>
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="font-semibold">Full Content</h3>
                        <p className="text-muted-foreground">
                        Recent advancements in machine learning models have enabled developers...
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
            </Card>
      </div>
    )
} 