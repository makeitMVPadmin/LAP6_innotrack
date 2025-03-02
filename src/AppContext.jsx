import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { toast } from "sonner";
import { createNewCategory } from "./functions/createNewCategory";
import { fetchContent } from "./functions/fetchContent";
import defaultPicture from "./assets/placeholder.jpg";
import { fetchCategoriesByUserId } from "./functions/fetchUsersCategories";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [content, setContent] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [categories, setCategories] = useState([]);
    const [bookmarkPictures, setBookmarkPictures] = useState({});

    async function handleCreateNewCollection(newCategoryInfo) {
        try {
            let categoryInfo = {
                userID: "1uIX6OjnNQi0bSXcmxV0",
                name: newCategoryInfo.name,
                createdAt: newCategoryInfo.createdAt,
            };
            const newCategory = await createNewCategory(categoryInfo);
            const isEmpty = (obj) => Object.keys(obj).length === 0;

            if (isEmpty(newCategory)) {
                //post to DB not successfull
                setTimeout(
                    () =>
                        toast.error("Unable to add Collection", {
                            duration: 2000,
                            position: "top-left",
                        }),
                    2000
                );
                setCategories((prev) => [...prev]);
            } else {
                //post to DB successfull
                setTimeout(
                    () =>
                        toast.success("Collection Added", {
                            duration: 2000,
                            position: "top-left",
                        }),
                    2000
                );
                setCategories((prev) => [...prev, newCategory]);
                // setBookmarkPictures((prev) => ({
                //     ...prev,
                //     [newCategory.id]: defaultPicture,
                // }));
            }
        } catch (error) {
            console.error("Error creating collection: ", error);
            toast.error("Unable to add Collection", {
                duration: 2000,
                position: "top-left",
            });
        }
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

        setCategories((prev) => {
            const newCategories = prev.map((cat) => ({
                ...cat,
                contentIds: [...(cat.contentIds || [])],
            }));

            const category = newCategories[categoryIndex];

            if (category.contentIds.includes(contentId)) {
                category.contentIds = category.contentIds.filter(
                    (id) => id !== contentId
                );
                console.log("Removed contentId: ", contentId);
            } else {
                category.contentIds.push(contentId);
                console.log("Added contentId: ", contentId);
            }

            return newCategories;
        });
    }

    async function updateBookmarkPictures() {
        const newPictures = {};
        for (const category of categories) {
            if (category.contentIds && category.contentIds.length > 0) {
                const firstContentId = category.contentIds[0];
                try {
                    const content = await fetchContent(firstContentId);
                    newPictures[category.id] =
                        content.picture || defaultPicture;
                } catch (error) {
                    console.error(
                        `Error fetching content for category ${category.id}: `,
                        error
                    );
                    newPictures[category.id] = defaultPicture;
                }
            } else {
                newPictures[category.id] = defaultPicture;
            }
        }
        setBookmarkPictures(newPictures);
    }

    useEffect(() => {
        if (categories?.length > 0 && content.length > 0) {
            updateBookmarkPictures();
        }
    }, [categories, content]);

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
        async function fetchCategories() {
            const userId = "1uIX6OjnNQi0bSXcmxV0";
            try {
                const userCategories = await fetchCategoriesByUserId(userId);
                console.log("User Categories: ", userCategories);

                setCategories(userCategories);
            } catch (error) {
                console.error(
                    `Error fetching categories for user ${userId}: `,
                    error
                );
            }
        }
        fetchCategories();
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
                bookmarkPictures,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
