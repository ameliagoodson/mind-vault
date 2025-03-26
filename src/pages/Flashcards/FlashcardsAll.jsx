import { useFetchFlashcards } from "../../hooks/useFetchFlashcards";
import Flashcard from "./Flashcard";

const FlashcardsAll = () => {
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
  return (
    <div className="all-flashcards w-full">
      <div className="grid-cols-auto-fit grid w-full gap-4">
        {flashcards.map((card) => (
          <Flashcard
            key={card.id}
            id={card.id}
            flashcard={card}
            deleteFlashcard={deleteFlashcard}
            type={"small"}
          />
        ))}
      </div>
    </div>
  );
};

export default FlashcardsAll;
