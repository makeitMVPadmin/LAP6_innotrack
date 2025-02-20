import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function NewCollectionPopup() {
    const [newCategoryName, setNewCategoryName] = useState("");
    const [isNewCollectionPopupOpen, setIsNewCollectionPopupOpen] =
        useState(false);
    const [error, setError] = useState(false);

    function handleCreateNewCategory() {
        /*
        create a category object
            fields: id, name, userId, contentId, ?createdAt
        call onCreateCollection function
            takes a new category object and adds it to the collections array
        reset new cat name
        */
        const regex = /^[a-zA-Z0-9-_/&+]+$/;
        newCategoryName.trim();
        if (regex.test(newCategoryName)) {
            let newCategory = {
                id: Date.now(),
                name: newCategoryName.trim(),
            };
            console.log(newCategory);
            setError(false);
        } else {
            setError(true);
        }
        setNewCategoryName("");
    }

    function handleCancel() {
        setIsNewCollectionPopupOpen(false);
    }

    return (
        <>
            <Button
                onClick={() => {
                    setIsNewCollectionPopupOpen(true);
                    setError(false);
                }}
            >
                Test Add Collection
            </Button>

            {isNewCollectionPopupOpen && (
                <Card className="w-[324px] border-black border-r-2 border-b-2  bg-[#FCFDFD]">
                    <CardContent className="pt-4 px-4">
                        <Input
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Enter collection name"
                            className={cn(
                                "text-lg border-[#182127] border-r-2 border-b-2 rounded-lg",
                                error && "border-red-600"
                            )}
                        />
                    </CardContent>
                    <CardFooter className="pb-4 px-4 flex justify-between">
                        <Button
                            onClick={handleCancel}
                            className="bg-[#FCFDFD] border-black border-l border-t border-r-2 border-b-2 focus:outline-none"
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreateNewCategory}
                            className="bg-[#0264D4] hover:bg-[#0264D4] border-black border-l border-t border-r-2 border-b-2 rounded-lg shadow-customButton"
                        >
                            Done
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </>
    );
}
