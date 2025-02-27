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

const HARD_CODED_CATEGORIES = [
    {
        id: "ro7Sz05bCKdfzFaYUOx7",
        name: "network",
        userID: "dNC63cyuDbEoEntxBpe9",
        contentID: [
            "HIM6R8AbiEKBZWhkIy8Y",
            "j9Tq3xCdLp7mRv1sFg0H",
            "0c4a01729ebdc11d608865176acd925ce0625353fa6c60982c284e16bd4eefb9",
        ],
        createdAt: "July 3, 2024 at 1:55:50 AM UTC-4",
    },
    {
        id: "lRqX0IFdr6u1gQXRBGa1",
        name: "drive",
        userID: "dNC63cyuDbEoEntxBpe9",
        contentID: [
            "afYzXislW1iopWhNyQF3",
            "07cfdd3433077bf9e3b11b15a41e1535c0609342b731a59f573044905b2997d0",
        ],
        createdAt: "March 6, 2024 at 12:32:25 AM UTC-5",
    },
];

export default function Bookmark({ contentId }) {
    console.log(`content Id being looked at: ${contentId}`);
    /*
    Bookmark should have a prop contentInfo:
        {contentId, userId?} = contentInfo
    */
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    function handleCategoryToggle(categoryIndex) {
        /*
        if selectedCategories.includes(categoryId)
            then it was already checked so uncheck it now...
            -remove contentId from category.contentID...use array filter 
            -UPDATE category collection in DB using categoryId
            -if DB update successful, display confimation message
                -else display error message
        else
            it was unchecked so check it
            -add contentId to category.contentID array
            -update category collection in db 
            -if DB update successful, display confimation method
                -else display error message

         */
        const newCategories = [...categories];
        const indexOfID = newCategories[categoryIndex].contentID.findIndex(
            (id) => id === contentId
        );
        indexOfID !== -1
            ? newCategories[categoryIndex].contentID.splice(indexOfID, 1)
            : newCategories[categoryIndex].contentID.push(contentId);

        setCategories(newCategories);
    }

    for (let cat of categories) {
        console.log(`${cat.name} --content ids: ${cat.contentID}`);
    }

    function handleCreateNewCollection(newCategoryInfo) {
        /*
        -use contentId prop to create newCategory object
            -const {name, createdAt} = newCategoryInfo
            -create a random category Id that look like ids in DB
            -format createdAt date to look like data in DB**
            -where to get userID????

        -what about the icon picture? logic for how to get it?
        
        -setCategories
        -display confirmation message (inside NewCollectionPopup dialog, before removing visiability)
        -POST To firestore DB
        
         */
        let newCategory = {
            id: Date.now(),
            userID: "dNC63cyuDbEoEntxBpe9",
            contentID: [],
            ...newCategoryInfo,
        };
        console.log(newCategory);
        setCategories([...categories, newCategory]);
    }

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
        console.log("inside useEffect");
        /**Add code here to fetch Categories from DB by doing:
         * import {fetchUsersCategories, fetchCategoriesByUserId} from ../functions
         *
         * result from the function should give back an array
         */
        setCategories(HARD_CODED_CATEGORIES);
    }, []);

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
                                                    contentId
                                                )}
                                                onCheckedChange={() =>
                                                    handleCategoryToggle(index)
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
