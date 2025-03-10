import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { toast } from "sonner";
import { createNewCategory } from "./functions/createNewCategory";
import { fetchContent } from "./functions/fetchContent";
import defaultPicture from "./assets/placeholder.jpg";
import { fetchCategoriesByUserId } from "./functions/fetchUsersCategories";
import { updateCategory } from "./functions/updateCategory";

const AppContext = createContext();
const USERID = "ZioBxBm4GBhHBn392wma";

export const AppProvider = ({ children }) => {
    const [content, setContent] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [categories, setCategories] = useState([]);
    const [bookmarkPictures, setBookmarkPictures] = useState({});

    async function handleCreateNewCollection(newCategoryInfo) {
        try {
            let categoryInfo = {
                userID: USERID,
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
        setCategories((prevCategories) => {
            const newCategories = [...prevCategories];
            const category = newCategories[categoryIndex];
            const isAdding = !category.contentIds.includes(contentId);

            //optimistic update of the UI
            if (isAdding) {
                category.contentIds = [...category.contentIds, contentId];
            } else {
                category.contentIds = category.contentIds.filter(
                    (id) => id !== contentId
                );
            }

            //DB update
            updateCategory(category.id, contentId, isAdding)
                .then((updatedCategory) => {
                    if (updatedCategory) {
                        setCategories((currentCategories) => {
                            const updatedCategories = [...currentCategories];
                            updatedCategories[categoryIndex] = {
                                ...updatedCategories[categoryIndex],
                                contentIds: updateCategory.contentIds,
                            };
                        });
                        console.log(
                            `Successfully ${
                                isAdding ? "added to" : "removed from"
                            } category`
                        );
                    } else {
                        //DB update failed somehow so revert the optimistic update
                        setCategories((currentCategories) => {
                            const revertedCategories = [...currentCategories];
                            revertedCategories[categoryIndex] = {
                                ...prevCategories[categoryIndex],
                            };
                            return revertedCategories;
                        });
                        console.error("Failed to update category");
                    }
                })
                .catch((error) => {
                    console.error("Error updating category:", error);
                    //reverting optimistic ui update
                    setCategories((currentCategories) => {
                        const revertedCategories = [...currentCategories];
                        revertedCategories[categoryIndex] = {
                            ...prevCategories[categoryIndex],
                        };
                        return revertedCategories;
                    });
                });

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
            try {
                const userCategories = await fetchCategoriesByUserId(USERID);
                console.log("User Categories: ", userCategories);

                setCategories(userCategories);
            } catch (error) {
                console.error(
                    `Error fetching categories for user ${USERID}: `,
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
