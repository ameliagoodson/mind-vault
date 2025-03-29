// Manages retrieval of flashcards from Firestore
// Creates an array of flashcards
// Creates a list of categories used in flashcards

import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import useFlashcards from "../pages/Flashcards/useFlashcards";
import useToggle from "./useToggle";
import { db } from "../firebase";
import useLog from "./useLog";

export const useFetchFlashcards = () => {
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, toggleLoading] = useToggle(true);

  useEffect(() => {
    if (!user) return;

    const getFlashcards = async () => {
      const querySnapshot = await getDocs(
        collection(db, "users", user.uid, "flashcards"),
      );

      const flashcardsArray = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          ...data,
        };
      });

      // Create array of unique categories
      const categories = flashcardsArray.flatMap(
        (flashcard) => flashcard.category,
      );

      const uniqueCategories = [...new Set(categories)]; // Set creates an object so we need to convert back to an array
      setCategoriesList(uniqueCategories);

      setFlashcards(flashcardsArray);
      toggleLoading(false);
    };

    getFlashcards();
  }, [user]);

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
  return {
    user,
    flashcards,
    setFlashcards,
    toggleLoading,
    loading,
    setCategoriesList,
    categoriesList,
    deleteFlashcard,
  };
};
