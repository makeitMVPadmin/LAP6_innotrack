import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import NewCollectionPopup from "./NewCollectionPopup";
import { cn } from "@/lib/utils";
import {
    CustomDialog as Dialog,
    CustomDialogTrigger as DialogTrigger,
    CustomDialogContent as DialogContent,
} from "@/components/ui/custom-dialog";
import {
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import bookmarkIcon from "../assets/icons/bookmark.svg";
import bookmarkFilledIcon from "../assets/icons/bookmark-filled.svg";
import defaultCategoryPic from "../assets/placeholder.jpg";
import { useAppContext } from "../AppContext";

export default function Bookmark({ contentInfo }) {
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const {
        categories,
        handleCategoryToggle,
        handleCreateNewCollection,
        bookmarkPictures,
    } = useAppContext();
    const [icon, setIcon] = useState(bookmarkIcon);

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

    useEffect(() => {
        const filled = (category) =>
            Array.isArray(category.contentIds) &&
            category.contentIds.includes(contentInfo.id);
        if (categories?.some(filled)) {
            setIcon(bookmarkFilledIcon);
        } else {
            setIcon(bookmarkIcon);
        }
    });

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
                    <img src={icon} alt="Bookmark Icon" />
                </DialogTrigger>
                <DialogContent className="p-0 bg-transparent border-none shadow-none top-64">
                    <div
                        className={cn(
                            "transform transition-all duration-300 ease-in-out",
                            isDialogVisible
                                ? "-translate-x-64"
                                : "-translate-x-[1500px]"
                        )}
                    >
                        <div className="w-60 h-64 px-5 py-4 bg-white rounded-xl border-black border-r-2 border-b-2 flex flex-col">
                            <DialogHeader className="p-0 mb-4">
                                <DialogTitle className="text-lg">
                                    Add To A Collection
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex-1">
                                <ScrollArea className="h-36 py-2">
                                    {categories &&
                                        categories.map((category, index) => (
                                            <div
                                                key={category.id}
                                                className="flex items-center space-x-2 mb-2"
                                            >
                                                <img
                                                    src={
                                                        bookmarkPictures[
                                                            category.id
                                                        ] || defaultCategoryPic
                                                    }
                                                    alt="bookmark collection picture"
                                                    className="w-8 h-8 rounded mr-2"
                                                />
                                                <Checkbox
                                                    id={`category-${category.id}`}
                                                    checked={category.contentIds?.includes(
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
                                                    className="text-md font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {category.name}
                                                </label>
                                            </div>
                                        ))}
                                    {categories && categories.length === 0 && (
                                        <p className="font-inter px-6 text-center">
                                            You have no collections. Click "New
                                            Collection" to bookmark this content
                                        </p>
                                    )}
                                    {!categories && <div>Loading...</div>}
                                </ScrollArea>
                            </div>
                            <DialogFooter className="p-0 sm:justify-between">
                                <NewCollectionPopup
                                    onCreateCollection={
                                        handleCreateNewCollection
                                    }
                                    bookmarks={categories}
                                />
                                <Button
                                    onClick={handleCloseDialog}
                                    size="sm"
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
