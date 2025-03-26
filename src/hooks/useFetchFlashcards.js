import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import useFlashcards from "../pages/Flashcards/useFlashcards";
import useToggle from "./useToggle";
import { db } from "../firebase";
import useLog from "./useLog";

export const useFetchFlashcards = () => {
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, toggleLoading] = useToggle(true);
  const { deleteFlashcard } = useFlashcards(setFlashcards);

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
