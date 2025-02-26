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
            "magPC2025asusROG",
        ],
        createdAt: "July 3, 2024 at 1:55:50 AM UTC-4",
    },
    {
        id: "lRqX0IFdr6u1gQXRBGa1",
        name: "drive",
        userID: "dNC63cyuDbEoEntxBpe9",
        contentID: ["afYzXislW1iopWhNyQF3"],
        createdAt: "March 6, 2024 at 12:32:25 AM UTC-5",
    },
];

export default function Bookmark({ contentId }) {
    /*
    Bookmark should have a prop contentInfo:
        {contentId, userId?} = contentInfo
    */
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    // let { currContentId } = contentInfo;

    function handleCategoryToggle(categoryId) {
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

        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
        console.log("inside HANDLE TOGGLE");
        console.log("Current Selected Category array: ", selectedCategories);
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
            contentID: contentId,
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

    /*
    fetch existing Categories from DB when component mounts
        -setCategories with the fetched data
        ...
        each existing category looks like {id, name, userid, contentid[], createdAt}
        let arrayOfSelectedCategories
        loop through existing category array
            if(contentId(prop) inside/=== category.contentID)
                arrayOfSelectedCategories.push(contentId)
        -setSelectedCategories(arrayOfSelectedCategories)

    */
    useEffect(() => {
        console.log("inside useEffect");

        /**Add code here to fetch Categories from DB by doing:
         * import {fetchUsersCategories, fetchCategoriesByUserId} from ../functions
         *
         * result from the function should give back an array
         */
        setCategories(HARD_CODED_CATEGORIES);
        //set selected categories
        for (let cat of categories) {
            //contentId
            if (cat.contentID.includes("magPC2025asusROG")) {
                console.log(
                    cat.name,
                    " has the current content in it's contentID array!"
                );
                setSelectedCategories([...selectedCategories, cat.id]);
            }
        }
    }, []);
    // console.log("Initial Categories: ", categories);
    // console.log("Initial Selected Category array: ", selectedCategories);

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
                                    {categories.map((category) => (
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
                                                checked={selectedCategories.includes(
                                                    category.id
                                                )}
                                                onCheckedChange={() =>
                                                    handleCategoryToggle(
                                                        category.id
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
