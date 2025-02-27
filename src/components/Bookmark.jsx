import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import NewCollectionPopup from "./NewCollectionPopup";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import bookmarkIcon from "../assets/icons/bookmark.svg";
import { useAppContext } from "../AppContext";

export default function Bookmark({ contentInfo }) {
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { categories, handleCategoryToggle, handleCreateNewCollection } =
        useAppContext();
    console.log(`content Id being looked at: ${contentInfo.id}`);

    function handleCloseDialog() {
        setIsDialogVisible(false);
        setTimeout(() => {
            setIsDialogOpen(false);
        }, 300);
    }

    useEffect(() => {
        if (isDialogOpen) {
            const timer = setTimeout(() => {
                setIsDialogVisible(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isDialogOpen]);

    return (
        <>
            <Dialog
                open={isDialogOpen}
                onOpenChange={(open) => {
                    if (open) {
                        setIsDialogOpen(true);
                    }
                }}
            >
                <DialogTrigger asChild>
                    <img src={bookmarkIcon} alt="Bookmark Icon" />
                </DialogTrigger>
                <DialogContent className="p-0 bg-transparent border-none shadow-none">
                    <div
                        className={cn(
                            "transform transition-all duration-300 ease-in-out",
                            isDialogVisible
                                ? "-translate-x-[600px]"
                                : "-translate-x-[1500px]"
                        )}
                    >
                        <div className="w-[346px] h-[358px] px-6 py-4 bg-white rounded-xl border-black border-r-2 border-b-2 flex flex-col">
                            <DialogHeader className="p-0 mb-4">
                                <DialogTitle className="text-2xl">
                                    Add to A Collection
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex-1">
                                <ScrollArea className="h-[210px] py-2">
                                    {categories.map((category, index) => (
                                        <div
                                            key={category.id}
                                            className="flex items-center space-x-2 mb-2"
                                        >
                                            <img
                                                src="../assets/placeholder.svg"
                                                alt=""
                                                className="w-12 h-12 rounded mr-2"
                                            />
                                            <Checkbox
                                                id={`category-${category.id}`}
                                                // checked={selectedCategories.includes(
                                                //     category.id
                                                // )}
                                                checked={category.contentID.includes(
                                                    contentInfo.id
                                                )}
                                                onCheckedChange={() =>
                                                    handleCategoryToggle(
                                                        index,
                                                        contentInfo.id
                                                    )
                                                }
                                                className="border-[#546672] peer data-[state=checked]:bg-[#0264D4]"
                                            />
                                            <label
                                                htmlFor={`category-${category.id}`}
                                                className="text-lg font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {category.name}
                                            </label>
                                        </div>
                                    ))}
                                </ScrollArea>
                            </div>
                            <DialogFooter className="p-0 sm:justify-between">
                                <NewCollectionPopup
                                    onCreateCollection={
                                        handleCreateNewCollection
                                    }
                                />
                                <Button
                                    onClick={handleCloseDialog}
                                    className="text-[#28363F] bg-yellow-400 hover:bg-yellow-400 border-black border-l border-t border-r-2 border-b-2 rounded-lg shadow-customButton"
                                >
                                    Done
                                </Button>
                            </DialogFooter>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
