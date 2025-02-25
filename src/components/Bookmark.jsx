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
import { useEffect, useState } from "react";
import NewCollectionPopup from "./NewCollectionPopup";

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

export default function Bookmark({ contentInfo, onDone }) {
    /*
    Bookmark should have a prop contentInfo:
        {contentId, userId} = contentInfo
    */
    const [isNewCollectionPopupOpen, setIsNewCollectionPopupOpen] =
        useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    let { currContentId, userId } = contentInfo;

    function handleCategoryToggle(categoryId) {
        /*
        if contentID is an array content ids
            if setSelectedCategories.includes(categoryId)
                then it was already checked so uncheck it now...
                -remove contentId (prop) from category.contentID..use filter?
                    -update category collection in db 
                    -if DB update successful, display confimation method
            else
                it was unchecked so check it
                -add contentId (prop) to category.contentID array
                    -update category collection in db 
                    -if DB update successful, display confimation method

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
        /* **Daryl will add a 'bookmark category collection to DB**
        -use contentInfo prop to create newCategory object
            -const {name, createdAt} = newCategoryInfo
            -how to create a catgory Id that matches DB collection ID?
            -format createdAt date to look like data in DB
        -what about the icon picture? logic for how to get it?
            -
        -POST To firestore DB
        -setCategories with newly created category
         */
        let newCategory = {
            id: Date.now(),
            userID: userId,
            contentID: currContentId,
            ...newCategoryInfo,
        };
        console.log(newCategory);
        setCategories([...categories, newCategory]);
        setIsNewCollectionPopupOpen(false);
    }

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
        console.log("Initial Categories: ", categories);
        //set selected categories
        for (let cat of categories) {
            if (cat.contentID.includes(currContentId)) {
                console.log(
                    cat.name,
                    " has the current content in it's contentID array!"
                );
                setSelectedCategories([...selectedCategories, cat.id]);
            }
        }
        console.log("Initial Selected Category array: ", selectedCategories);
    }, []);

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
                                        handleCategoryToggle(category.id)
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
                </CardContent>
                <CardFooter className="p-0 justify-between">
                    <Button
                        onClick={() => setIsNewCollectionPopupOpen(true)}
                        className="bg-[#0264D4] hover:bg-[#0264D4] border-black border-l border-t border-r-2 border-b-2 rounded-lg shadow-customButton"
                    >
                        New Collection
                    </Button>
                    <Button
                        onClick={onDone}
                        className="text-[#28363F] bg-yellow-400 hover:bg-yellow-400 border-black border-l border-t border-r-2 border-b-2 rounded-lg shadow-customButton"
                    >
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
