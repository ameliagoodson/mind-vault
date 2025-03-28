import { useState, useEffect } from "react";
import { useFetchFlashcards } from "../../hooks/useFetchFlashcards";
import Flashcard from "./Flashcard";
import { useParams } from "react-router";
import useLog from "../../hooks/useLog";
import { FlashcardCategoriesBtns } from "./FlashcardCategoriesBtns";
import FlashcardSet from "./FlashcardSet";

const FlashcardSetUI = () => {
  return (
    <div className="flashcard-set w-full">
      <FlashcardCategoriesBtns basePath="/flashcards" />
      <FlashcardSet type={"grid"} />
    </div>
  );
};

export default FlashcardSetUI;
