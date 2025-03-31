import { saveToDB } from "../../firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import placeholders from "../../data/placeholders";

const saveFlashcard = async (flashcards, user) => {
  console.log(
    "flashcards received in saveFlashcard:",
    JSON.stringify(flashcards),
  );
  // console.log("user:", user?.uid);

  // Check if any flashcards have IDs
  const hasIds = flashcards.some((f) => f.id);
  // console.log("Do any flashcards have IDs?", hasIds);

  if (!user || !user.uid) {
    console.error("❌ User not authenticated or missing UID:", user);
    return;
  }

  for (const flashcard of flashcards) {
    // Check if this flashcard has an ID (meaning it exists in Firestore)
    if (flashcard.id && flashcard.id.length > 0) {
      try {
        console.log("✅ Updating existing flashcard:", flashcard.id);
        const docRef = doc(db, "users", user.uid, "flashcards", flashcard.id);

        // Create an update object without the ID
        const { id, ...updateData } = flashcard;

        await updateDoc(docRef, updateData);
        console.log("✅ Flashcard updated successfully");
      } catch (error) {
        console.error("❌ Error updating flashcard:", error);
      }
    } else {
      // No ID means this is a new flashcard
      console.log("✅ Creating new flashcard (no valid ID found)");
      try {
        // Remove any undefined ID property to prevent Firestore errors
        const { id, ...flashcardData } = flashcard;

        // Save to Firestore using saveToDB
        await saveToDB({
          user,
          question: flashcardData.question,
          answer: flashcardData.answer,
          category: flashcardData.category || [],
          code: flashcardData.code || "",
        });

        console.log("✅ New flashcard saved successfully");
      } catch (error) {
        console.error("❌ Error saving new flashcard:", error);
      }
    }
  }
};

export default saveFlashcard;
