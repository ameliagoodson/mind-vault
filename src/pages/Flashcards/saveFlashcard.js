import { saveToDB } from "../../firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const saveFlashcard = async (flashcards, user) => {
  console.log(
    "flashcards received in saveFlashcard:",
    JSON.stringify(flashcards),
  );
  console.log("user:", user?.uid);

  // Check if any flashcards have IDs
  const hasIds = flashcards.some((f) => f.id);
  console.log("Do any flashcards have IDs?", hasIds);

  if (!user || !user.uid) {
    console.error("❌ User not authenticated or missing UID:", user);
    return;
  }

  for (const flashcard of flashcards) {
    console.log("Checking flashcard.id:", flashcard.id);
    console.log("typeof flashcard.id:", typeof flashcard.id);
    console.log("Is falsy?", !flashcard.id);

    // Check if this flashcard has an ID (meaning it exists in Firestore)
    if (flashcard.id && flashcard.id.length > 0) {
      try {
        console.log("✅ Updating existing flashcard:", flashcard.id);
        // ... rest of update code
      } catch (error) {
        console.error("❌ Error updating flashcard:", error);
      }
    } else {
      // No ID means this is a new flashcard
      console.log("✅ Creating new flashcard (no valid ID found)");
      // ... rest of create code
    }
  }
};

export default saveFlashcard;
