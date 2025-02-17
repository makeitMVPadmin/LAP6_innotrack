import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function NewCollectionPopup() {
    const [newCategoryName, setNewCategoryName] = useState("");

    function handleCreateNewCategory() {
        /*
        create a category object
            field: id, name, userId, contentId, ?createdAt
        call onCreateCollection
            takes a new category object and adds it to the collections array
        reset new cat name
        */
    }

    return (
        <Card className="w-[324px] border-r-2 border-b-2 border-black bg-[#FCFDFD]">
            <CardContent className="pt-4 px-4">
                <Input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Enter collection name"
                    className="text-lg border-r-2 border-b-2 border-[#182127] rounded-lg"
                />
            </CardContent>
            <CardFooter className="pb-4 px-4 flex justify-between">
                <Button
                    onClick={handleCreateNewCategory}
                    className="bg-yellow-400 hover:bg-yellow-400 text-[#28363F] rounded-lg shadow-customButton focus:outline-none"
                >
                    Done
                </Button>
                <Button
                    className="bg-[#FCFDFD] focus:outline-none"
                    variant="ghost"
                >
                    Cancel
                </Button>
            </CardFooter>
        </Card>
    );
}
