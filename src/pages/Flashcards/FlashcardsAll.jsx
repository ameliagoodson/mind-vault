import { useFetchFlashcards } from "../../hooks/useFetchFlashcards";
import Flashcard from "./Flashcard";
import { useParams } from "react-router";
import useLog from "../../hooks/useLog";

const FlashcardsAll = () => {
  const { flashcards, deleteFlashcard } = useFetchFlashcards();

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
          />
        ))}
      </div>
    </div>
  );
};

export default FlashcardsAll;
