import { deleteDoc, doc } from "firebase/firestore";
import { saveToDB } from "../../firestore";
import { useId, useState } from "react";
import { db } from "../../firebase";

const useFlashcards = (setFlashcards) => {
  // Create state variables
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");
  const [editedCategories, setEditedCategories] = useState("");
  const [editedCode, setEditedCode] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Add editedFlashcard state to manage all fields in one object
  const [editedFlashcard, setEditedFlashcard] = useState({
    question: "",
    answer: "",
    category: "",
    code: "",
  });

  const deleteFlashcard = async (id, user) => {
    if (!user || !id) {
      console.error("❌ ERROR: Missing user or flashcard ID", { user, id });
      return;
    }

    try {
      console.log("🟢 Attempting to delete flashcard with ID:", id);

      const docRef = doc(db, "users", user.uid, "flashcards", id);
      console.log("✅ docRef created:", docRef);

      await deleteDoc(docRef);
      console.log("🗑️ Flashcard deleted successfully from Firestore!");

      setFlashcards((prev = []) => {
        console.log("🔥 Before deleting, flashcards are:", prev);
        return prev.filter((card) => card.id !== id);
      });

      console.log("✅ State updated, flashcard removed from UI");
    } catch (error) {
      console.error("❌ Error deleting flashcard:", error);
    }
  };

  // Return all the functions and state values the component needs
  return {
    editedQuestion,
    editedAnswer,
    editedCategories,
    editedCode,
    editedFlashcard,
    isSaved,
    setEditedQuestion,
    setEditedAnswer,
    setEditedCategories,
    setEditedCode,
    setEditedFlashcard,
    setIsSaved,
    deleteFlashcard,
  };
};
export default useFlashcards;
