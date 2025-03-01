import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export const saveToDB = async ({ user, question, answer, category }) => {
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
    await addDoc(flashcardsCollectionRef, {
      question: question,
      answer: answer,
      category: category,
    });
    console.log("Test data saved!");
  } catch (error) {
    console.error("Error saving flashcard:", error);
  }
};
