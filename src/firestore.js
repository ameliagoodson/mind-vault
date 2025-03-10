import { db } from "./firebase";
import { collection, doc, deleteDoc } from "firebase/firestore";

export const saveToDB = async ({ user, question, answer, category, code }) => {
  if (!user) {
    console.error("User not authenticated");
    return;
  }
  try {
    const flashcardsCollectionRef = collection(
      db,
      "users",
      user.uid,
      "flashcards",
    );

    const flashcardData = {
      question,
      answer,
      category,
    };

    console.log("code: ", code);
    // Only add 'code' if it has a value
    if (code) {
      flashcardData.code = code;
    }

    await addDoc(flashcardsCollectionRef, flashcardData);

    console.log("Test data saved!", flashcardData);
  } catch (error) {
    console.error("Error saving flashcard:", error);
  }
};

export const deleteFromDB = async (user) => {
  if (!user) {
    console.error("User not authenticated");
    return;
  }
  try {
    const flashcardsCollectionRef = collection(
      db,
      "users",
      user.uid,
      "flashcards",
      // flashcard id
    );

    await deleteDoc(flashcardsCollectionRef);
  } catch (error) {}
};
