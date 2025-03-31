import { useState, useEffect } from "react";
import { useFetchFlashcards } from "../../hooks/useFetchFlashcards";
import Flashcard from "./Flashcard";
import { useParams } from "react-router";
import useLog from "../../hooks/useLog";
import { FlashcardCategoriesBtns } from "../../components/FlashcardCategoriesBtns";
import FlashcardSet from "./FlashcardSet";
import useFlashcards from "./useFlashcards";
import { useFilterFlashcards } from "../../hooks/useFilterFlashcards";

const FlashcardSetUI = () => {
  const { setFlashcards } = useFetchFlashcards();
  const { deleteFlashcard, isFlipped, setIsFlipped } = useFlashcards();
  return (
    <div className="flashcard-set w-full">
      <FlashcardCategoriesBtns basePath="/flashcards" />
      <FlashcardSet
        type={"grid"}
        deleteFlashcard={deleteFlashcard}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
      />
    </div>
  );
};

export default FlashcardSetUI;
