import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import NewCollectionPopup from "./NewCollectionPopup";

export default function Bookmark() {
    const [isNewCollectionPopupOpen, setIsNewCollectionPopupOpen] =
        useState(false);

    function handleCreateNewCollection(newCategory) {
        console.log(newCategory);
        setIsNewCollectionPopupOpen(false);
    }
    return (
        <>
            <Card className="w-[346px] h-[358px] px-6 py-4 border-black border-r-2 border-b-2 flex flex-col">
                <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl">
                        Add to A Collection
                    </CardTitle>
                </CardHeader>
                <CardContent className=" flex-1">
                    <ScrollArea className="h-[210px] py-2">
                        <div className="flex items-center space-x-2 mb-2">
                            <img
                                src="../assets/placeholder.svg"
                                alt=""
                                className="w-12 h-12 rounded mr-2"
                            />
                            <Checkbox
                                id="123abc"
                                className="border-[#546672] peer data-[state=checked]:bg-[#0264D4]"
                            />
                            <label
                                htmlFor="123abc"
                                className="text-lg font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Item 1
                            </label>
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="p-0 justify-between">
                    <Button
                        onClick={() => setIsNewCollectionPopupOpen(true)}
                        className="bg-[#0264D4] hover:bg-[#0264D4] border-black border-l border-t border-r-2 border-b-2 rounded-lg shadow-customButton"
                    >
                        New Collection
                    </Button>
                    <Button className="text-[#28363F] bg-yellow-400 hover:bg-yellow-400 border-black border-l border-t border-r-2 border-b-2 rounded-lg shadow-customButton">
                        Done
                    </Button>
                </CardFooter>
            </Card>

            {isNewCollectionPopupOpen && (
                <NewCollectionPopup
                    onCancel={() => setIsNewCollectionPopupOpen(false)}
                    onCreateCollection={handleCreateNewCollection}
                />
            )}
        </>
    );
}
