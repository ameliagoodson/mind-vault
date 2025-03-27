import Flashcard from "./Flashcard";
import LoadingSpinnerLarge from "../../components/LoadingSpinnerLarge";
import { useParams } from "react-router";
import Button from "../../components/Button";
import { useFetchFlashcards } from "../../hooks/useFetchFlashcards";
import FlashcardsAll from "./FlashcardsAll";
import { FlashcardCategoriesBtns } from "./FlashcardCategoriesBtns";

const GetAllFlashcards = () => {
  const { category } = useParams();
  const { loading, categoriesList } = useFetchFlashcards();
  // ✅ Fix: Pass setFlashcards when calling useFlashcards

  return (
    <div className="container mx-auto flex h-full max-w-7xl flex-col">
      {loading && <LoadingSpinnerLarge />}
      <h1>Display Flashcards</h1>
      <FlashcardCategoriesBtns />
      <div className="flashcards-container">
        <FlashcardsAll />
      </div>
    </div>
  );
};

export default GetAllFlashcards;
