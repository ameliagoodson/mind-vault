import Flashcard from "./Flashcard";
import LoadingSpinnerLarge from "../../components/LoadingSpinnerLarge";
import { useParams } from "react-router";
import Button from "../../components/Button";
import { useFetchFlashcards } from "../../hooks/useFetchFlashcards";
import FlashcardsAll from "./FlashcardsAll";

const GetAllFlashcards = () => {
  const { category } = useParams();
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
  // ✅ Fix: Pass setFlashcards when calling useFlashcards

  return (
    <div className="container mx-auto flex h-full max-w-7xl flex-col">
      {loading && <LoadingSpinnerLarge />}
      <h1>Display Flashcards</h1>
      <div className="flashcard-categories flex">
        {categoriesList.map((category, index) => (
          <Button
            key={index}
            btntext={category}
            cssClasses={"btn-primary btn"}
            to={`/flashcards/${category}`}
          />
        ))}
      </div>
      <div className="flashcards-container">
        <FlashcardsAll />
      </div>
    </div>
  );
};

export default GetAllFlashcards;
