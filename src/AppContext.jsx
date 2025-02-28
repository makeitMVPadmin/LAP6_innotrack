import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { toast } from "sonner";

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

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [content, setContent] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [categories, setCategories] = useState([]);

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
        //post to DB successfull
        if (true) {
            setTimeout(
                () =>
                    toast.success("Collection Added", {
                        duration: 2000,
                        position: "top-left",
                    }),
                2000
            );

            setCategories((prev) => [...prev, newCategory]);
        } else {
            //post to DB not successfull
            setTimeout(
                () =>
                    toast.error(
                        "Cannot reach database, unable to add Collection",
                        {
                            duration: 2000,
                            position: "top-left",
                        }
                    ),
                2000
            );
            setCategories((prev) => [...prev]);
        }
    }

    for (let cat of categories) {
        console.log(`${cat.name} --content ids: ${cat.contentID}`);
    }

    function handleCategoryToggle(categoryIndex, contentId) {
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

    useEffect(() => {
        const fetchContent = async () => {
            const querySnapshot = await getDocs(
                query(collection(db, "content"), limit(7))
            );
            const contentData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setContent(contentData);
        };
        fetchContent();
        /**Add code here to fetch Categories from DB by doing:
         * import {fetchUsersCategories, fetchCategoriesByUserId} from ../functions
         * result from the function should give back an array
         */
        setCategories(HARD_CODED_CATEGORIES);
    }, []);

    return (
        <AppContext.Provider
            value={{
                content,
                currentIndex,
                setCurrentIndex,
                categories,
                handleCreateNewCollection,
                handleCategoryToggle,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
