import { useState, useEffect } from "react";
import { useFilterFlashcards } from "../../hooks/useFilterFlashcards";
import FlashcardArrows from "./FlashcardArrows.jsx";
import FlashcardAnswerControls from "./FlashcardAnswerControls.jsx";
import ButtonToggle from "../../components/ButtonToggle.jsx";
import useToggle from "../../hooks/useToggle.js";

export const FlashcardNavigation = ({
  currentCard,
  setCurrentCard,
  setIsFinished,
}) => {
  const { filteredFlashcards } = useFilterFlashcards();
  const [isDisabled, setIsDisabled] = useState({
    disableNext: false,
    disablePrev: true,
  });
  const [trackProgress, setTrackProgress] = useToggle();
  const finalCard = currentCard === filteredFlashcards.length - 1;
  let correctCount = 0;
  console.log("finalCard: ", finalCard);

  useEffect(() => {
    setIsDisabled({
      disablePrev: currentCard === 0,
    });
  }, [currentCard, filteredFlashcards.length]);

  return (
    <div>
      <ButtonToggle
        checked={trackProgress}
        onToggle={() => setTrackProgress()}
      />
      {trackProgress && (
        <FlashcardAnswerControls
          filteredFlashcards={filteredFlashcards}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
          correctCount={correctCount}
          finalCard={finalCard}
          setIsFinished={setIsFinished}
        />
      )}
      <FlashcardArrows
        filteredFlashcards={filteredFlashcards}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        currentCard={currentCard}
        setCurrentCard={setCurrentCard}
        finalCard={finalCard}
        setIsFinished={setIsFinished}
      />
    </div>
  );
};
