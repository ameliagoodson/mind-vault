import { useState, useEffect } from "react";
import { useFetchFlashcards } from "../../hooks/useFetchFlashcards";
import Flashcard from "./Flashcard";
import { useParams } from "react-router";
import useLog from "../../hooks/useLog";
import { FlashcardCategoriesBtns } from "../../components/FlashcardCategoriesBtns.jsx";
import { useFilterFlashcards } from "../../hooks/useFilterFlashcards.js";
import useFlashcards from "./useFlashcards.jsx";

const FlashcardSet = ({
  type,
  studyMode,
  isFlipped,
  setIsFlipped,
  handleCurrentCardChange,
  currentCard,
  deleteFlashcard,
  setCurrentCard,
}) => {
  const { category: paramCategory } = useParams();
  const { filteredFlashcards } = useFilterFlashcards(paramCategory);

  useEffect(() => {
    currentCard && handleCurrentCardChange(currentCard);
  }, [currentCard]);

  console.log("currentcard from flashcardset: ", currentCard);

  return (
    <div className="flashcard-set flex h-full flex-1">
      {type === "grid" && (
        <div className="grid-cols-auto-fit grid w-full gap-4">
          {console.log("confirming the grid check has been passed")}

          {filteredFlashcards
            ? filteredFlashcards.map((card, index) => {
                return (
                  <Flashcard
                    key={card.id}
                    flashcard={card}
                    type={"small"}
                    isFlipped={isFlipped[card.id] || false}
                    setIsFlipped={setIsFlipped}
                    deleteFlashcard={deleteFlashcard}
                  />
                );
              })
            : (console.log("there are no results"),
              (<span>"There are no results"</span>))}
        </div>
      )}
      {type === "single" && filteredFlashcards.length > 0 && (
        <Flashcard
          flashcard={filteredFlashcards[currentCard]}
          type={"single"}
          isFlipped={isFlipped[filteredFlashcards[currentCard]?.id] || false}
          setIsFlipped={setIsFlipped}
          deleteFlashcard={deleteFlashcard}
        />
      )}
    </div>
  );
};
export default FlashcardSet;
