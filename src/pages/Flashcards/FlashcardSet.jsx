import { useState, useEffect } from "react";
import { useFetchFlashcards } from "../../hooks/useFetchFlashcards";
import Flashcard from "./Flashcard";
import { useParams } from "react-router";
import useLog from "../../hooks/useLog";
import { FlashcardCategoriesBtns } from "./FlashcardCategoriesBtns";

const FlashcardSet = ({ category }) => {
  const { flashcards } = useFetchFlashcards();
  const [selectedCategory, setSelectedCategory] = useState();
  const { category: paramCategory } = useParams();
  const [filteredFlashcards, setFilteredFlashcards] = useState([]);

  // Determine category: use passed prop first, fallback to URL param
  const activeCategory = category || paramCategory;
  console.log("Rendering FlashcardSet with category:", activeCategory);
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

  return (
    <div className="grid-cols-auto-fit grid w-full gap-4">
      {filteredFlashcards
        ? filteredFlashcards.map((card) => (
            <Flashcard key={card.id} flashcard={card} type={"small"} />
          ))
        : (console.log("there are no results"),
          (<span>"There are no results"</span>))}
    </div>
  );
};
export default FlashcardSet;
