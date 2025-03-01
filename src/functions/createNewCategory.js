import { db } from "../../firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: "true",
        timeZoneName: "shortOffset",
    };
    return date.toLocaleString("en-US", options);
}

async function createNewCategory(categoryInfo) {
    try {
        //check for duplicate names
        const categoriesRef = collection(db, "categories");
        const categoriesSnapshot = await getDocs(categoriesRef);

        const isDuplicate = categoriesSnapshot.docs.some(
            (doc) =>
                doc.data().name.toLowerCase() ===
                categoryInfo.name.toLowerCase()
        );
        if (isDuplicate) {
            console.log("A category witht this name already exists");
            return {};
        }

        //Generate a new document reference to get an auto-generated ID
        const categoryRef = doc(collection(db, "categories"));

        //create the category object
        const newCategory = {
            contentIds: [],
            createdAt: formatDate(categoryInfo.createdAt),
            name: categoryInfo.name,
            userId: categoryInfo.userID,
        };

        //write to firestore
        await setDoc(categoryRef, newCategory);

        console.log("Created new category: ", newCategory);
        return newCategory;
    } catch (error) {
        console.log("Error creating new category: ", error);
        return {};
    }
}

async function test() {
    try {
        const testUserId = "1uIX6OjnNQi0bSXcmxV0";
        const testCategoryInfo = {
            userID: testUserId,
            name: "TestCreateCat",
            createdAt: Date.now(),
        };
        //write to firestore, this function prints
        const newCat = await createNewCategory(testCategoryInfo);

        //fetch all categories to verify creation
        // const userCategories = await fetchCategoriesByUserId(testUserId);

        //verify that new category is in results
        // const foundCategory = userCategories.find(
        //     (cat) => cat.id === newCat.id
        // );
        // if (foundCategory) {
        //     console.log(
        //         "Test passed: Category was successfully created and retrieved"
        //     );
        // } else {
        //     console.log(
        //         "Test failed: Created category was not found in database"
        //     );
        // }
    } catch (error) {
        console.error("Test failed with error:", error);
    }
}

export { createNewCategory };
test();
