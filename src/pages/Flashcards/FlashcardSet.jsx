import { useState, useEffect } from "react";
import { useFetchFlashcards } from "../../hooks/useFetchFlashcards";
import Flashcard from "./Flashcard";
import { useParams } from "react-router";
import useLog from "../../hooks/useLog";
import { FlashcardCategoriesBtns } from "./FlashcardCategoriesBtns";
import { useFilterFlashcards } from "../../hooks/useFilterFlashcards.js";

const FlashcardSet = ({ type, studyMode }) => {
  const { category: paramCategory } = useParams();
  const { filteredFlashcards } = useFilterFlashcards(paramCategory);
  const [currentCard, setCurrentCard] = useState(0);

  return (
    <div>
      {type === "grid" && (
        <div className="grid-cols-auto-fit grid w-full gap-4">
          {console.log("confirming the grid check has been passed")}

          {filteredFlashcards
            ? filteredFlashcards.map((card, index) => {
                console.log(`🃏 Mapping flashcard #${index + 1}:`, card);
                return (
                  <Flashcard key={card.id} flashcard={card} type={"small"} />
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
        />
      )}
    </div>
  );
};
export default FlashcardSet;
