import { useFetchFlashcards } from "../../hooks/useFetchFlashcards";
import Flashcard from "./Flashcard";
import { useParams } from "react-router";
import useLog from "../../hooks/useLog";
import useFlashcards from "./useFlashcards";

const FlashcardsAll = () => {
  const { flashcards, setFlashcards, deleteFlashcard } = useFetchFlashcards();
  const { isFlipped, setIsFlipped } = useFlashcards();

  return (
    <div className="all-flashcards mt-8 w-full">
      <div className="grid-cols-auto-fit grid w-full gap-4">
        {flashcards.map((card) => (
          <Flashcard
            key={card.id}
            id={card.id}
            flashcard={card}
            deleteFlashcard={deleteFlashcard}
            type={"small"}
            isFlipped={isFlipped[card.id] || false}
            setIsFlipped={setIsFlipped}
          />
        ))}
      </div>
    </div>
  );
};

export default FlashcardsAll;
