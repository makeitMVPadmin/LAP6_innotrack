import { db } from "../../firebase";
import {
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";

async function updateCategory(categoryId, contentId, isAdding) {
    try {
        //validate input
        if (!categoryId || !contentId) {
            throw new Error("categoryId and contentId are required");
            return {};
        }

        //get a reference to the category using the id
        const categoryDocRef = doc(db, "categories", categoryId);

        //fetch the data
        const categoryDoc = await getDoc(categoryDocRef);
        //verify that category with categoryid exists in DB
        if (!categoryDoc.exists()) {
            throw new Error(`Category with ID ${categoryId} not found`);
            return {};
        }

        await updateDoc(categoryDocRef, {
            contentIds: isAdding
                ? arrayUnion(contentId)
                : arrayRemove(contentId),
        });

        //fetch updated category
        const updatedCategoryDoc = await getDoc(categoryDocRef);
        const updatedCategory = updatedCategoryDoc.data();

        //format data
        const createdAtMillis = updatedCategory.createdAt.toMillis();
        const formatedUpdatedCategory = {
            id: updatedCategoryDoc.id,
            userId: updatedCategory.userId,
            contentIds: updatedCategory.contentIds,
            name: updatedCategory.name,
            createdAt: createdAtMillis,
        };

        console.log(
            `Successfully ${isAdding ? "added to" : "removed from"} category: `,
            formatedUpdatedCategory
        );
        return formatedUpdatedCategory;
    } catch (error) {
        console.error("Error updating category content: ", error);
        throw error;
        return {};
    }
}

async function test() {
    try {
        const testCategoryId = "I8MIrt1J0C4g3MaUB36b";
        const testContentId = "g0NqCiQXvGyueTJo8b8z";

        console.log("\n=== Starting Category Update Tests ===\n");

        console.log("Testing contentId addition...");
        const categoryWithAddedContent = await updateCategory(
            testCategoryId,
            testContentId,
            true
        );
        console.log(
            "Category after adding contentId: ",
            categoryWithAddedContent
        );
        categoryWithAddedContent.contentIds.includes(testContentId)
            ? console.log(
                  "Add Test: Success, content id was added to categoryIds array"
              )
            : console.log(
                  "Add Test: Fail, content id was not added to categoryIds array"
              );

        console.log("\nTesting contentId removal...");
        const categoryWithRemovedContent = await updateCategory(
            testCategoryId,
            testContentId,
            false
        );
        console.log(
            "Category after removing contentId:",
            categoryWithRemovedContent
        );
        !categoryWithRemovedContent.contentIds.includes(testContentId)
            ? console.log(
                  "Remove Test: Success, content id was removed to categoryIds array"
              )
            : console.log(
                  "Remove Test: Fail, content id was not removed to categoryIds array"
              );

        console.log("\nTesting duplicate addition...");
        await updateCategory(testCategoryId, testContentId, true);
        const categoryAfterDuplicate = await updateCategory(
            testCategoryId,
            testContentId,
            true
        );
        const occurences = categoryAfterDuplicate.contentIds.filter(
            (id) => id === testContentId
        ).length;
        occurences === 1
            ? console.log("Duplicate Test: No duplicates were created")
            : console.log("Duplicate Test: Duplicates were created");

        console.log("\n=== Category Update Tests Completed ===\n");
    } catch (error) {
        console.error("Test failed with error: ", error);
        throw error;
    }
}

export { updateCategory };
//test();
