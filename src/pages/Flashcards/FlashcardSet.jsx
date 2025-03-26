import { useState, useEffect } from "react";
import { useFetchFlashcards } from "../../hooks/useFetchFlashcards";
import Flashcard from "./Flashcard";
import { useParams } from "react-router";
import useLog from "../../hooks/useLog";

const FlashcardSet = () => {
  const {
    user,
    flashcards,
    setFlashcards,
    toggleLoading,
    loading,
    setCategoriesList,
    categoriesList,
    deleteFlashcard,
  } = useFetchFlashcards();
  const [selectedCategory, setSelectedCategory] = useState();
  const { category } = useParams();
  const [filteredFlashcards, setFilteredFlashcards] = useState([]);

  useLog(flashcards, "flashcards from flashcardset");

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  useEffect(() => {
    if (flashcards.length > 0) {
      setFilteredFlashcards(
        flashcards.filter((flashcard) => flashcard.category.includes(category)),
      );
    }
  }, [flashcards, category]);

  return (
    <div className="flashcard-set w-full">
      <div className="grid-cols-auto-fit grid w-full gap-4">
        {filteredFlashcards
          ? filteredFlashcards.map((card) => (
              <Flashcard key={card.id} flashcard={card} />
            ))
          : (console.log("there are no results"),
            (<span>"There are no results"</span>))}
      </div>
    </div>
  );
};

export default FlashcardSet;
