import saveFlashcard from "./saveFlashcard";
import processCategories from "../../utils/processCategories.js";

export const handleSaveFlashcard = async ({
  editedFlashcard,
  flashcard,
  updateFlashcard,
  handleSaveSuccess,
  toggleLoading,
  toggleEditing,
  user,
}) => {
  toggleLoading(true);

  try {
    const categoryToUse = editedFlashcard.category || flashcard?.category;

    let processedCategories = [];
    if (categoryToUse) {
      processedCategories = processCategories(categoryToUse);
    }

    // Ensure that we preserve the existing flashcard ID
    const updatedFlashcard = {
      id: flashcard?.id || editedFlashcard.id, // ✅ Ensure ID is carried over
      question: editedFlashcard.question || "",
      answer: editedFlashcard.answer || "",
      category: processedCategories || [],
      code: editedFlashcard.code || "",
    };

    // Log to confirm ID is included
    console.log("Saving flashcard with ID:", updatedFlashcard.id);

    if (!updatedFlashcard.id) {
      console.warn("⚠️ No existing ID found, creating a new flashcard.");
    } else {
      console.log(
        "✏️ Updating existing flashcard with ID:",
        updatedFlashcard.id,
      );
    }

    // Await the save/update to database
    await saveFlashcard([updatedFlashcard], user); // ✅ Pass only one object, not an array

    // Update the parent component's state with the new values
    if (updateFlashcard) {
      console.log("Updating parent component with:", updatedFlashcard);
      updateFlashcard(updatedFlashcard);
      handleSaveSuccess();
    }

    console.log("✅ Flashcard saved & exiting Edit Mode.");
  } catch (error) {
    console.error("❌ Error saving flashcard:", error);
  } finally {
    toggleLoading(false);

    if (toggleEditing) {
      toggleEditing(false);
    }
  }
};
