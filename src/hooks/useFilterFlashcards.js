import { useState, useEffect } from "react";
import { useFetchFlashcards } from "./useFetchFlashcards";
import Flashcard from "../pages/Flashcards/Flashcard";
import { useParams } from "react-router";
import useLog from "./useLog";
import { FlashcardCategoriesBtns } from "../pages/Flashcards/FlashcardCategoriesBtns";

export const useFilterFlashcards = (category) => {
  const { flashcards } = useFetchFlashcards();
  const [selectedCategory, setSelectedCategory] = useState();
  const { category: paramCategory } = useParams();
  const [filteredFlashcards, setFilteredFlashcards] = useState([]);

  // Determine category: use passed prop first, fallback to URL param
  const activeCategory = category || paramCategory;
  useEffect(() => {
    setSelectedCategory(activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    if (flashcards.length > 0) {
      if (activeCategory) {
        setFilteredFlashcards(
          flashcards.filter((flashcard) =>
            flashcard.category.includes(activeCategory),
          ),
        );
      } else {
        setFilteredFlashcards(flashcards);
      }
    }
  }, [flashcards, activeCategory]);
  return {
    filteredFlashcards,
  };
};
