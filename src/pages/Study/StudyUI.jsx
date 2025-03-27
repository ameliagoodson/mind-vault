import Flashcard from "../Flashcards/Flashcard";
import FlashcardNavigation from "../Flashcards/FlashcardNavigation";
import {
  FlashcardCategoriesBtns,
  FlashcardCategoriesBtnsBlock,
} from "../Flashcards/FlashcardCategoriesBtns";
import FlashcardSet from "../Flashcards/FlashcardSet";
import { useParams } from "react-router";
import { useFetchFlashcards } from "../../hooks/useFetchFlashcards";
import useLog from "../../hooks/useLog";

// how do we get here? click on study
// shows list of categories to study "click to study"
// first flashcard appears (randomise order)
// user answers question then flips and quicks to see if correct
// user marks answer as right or wrong
// user clicks next and next flashcard in array appears
// user can click out at anytime and go back to all flashcards
// when finished, user receives message about how many flashcards they got right

// variable for number of cards total ie array.length
// state for which how many cards are right and wrong
// state for how many cards the user is through the array ie current card
// state for is flipped or not
// reorganise flashcard so that only question is on front

const StudyUI = () => {
  const { category } = useParams();
  const { flashcards, setFlashcards, categoriesList } = useFetchFlashcards();

  useLog(flashcards, "flashcards");
  return (
    <div className="container mx-auto max-w-5xl bg-gray-50 p-6">
      {!category ? (
        <>
          <h1 className="text-center text-3xl font-bold">Study Mode</h1>
          {/* Study Stats */}
          <div className="mt-6 rounded-lg bg-white p-4 text-center shadow-md">
            <h2 className="text-xl font-semibold">Your Study Progress</h2>
            <p>
              Total Flashcards: <strong>{flashcards.length}</strong>
            </p>
            <p>
              Flashcards Studied Today: <strong>12</strong> (placeholder)
            </p>
            <p>
              Last Studied: <strong>React</strong> (3 days ago)
            </p>
          </div>

          <FlashcardCategoriesBtnsBlock />
        </>
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold">
            Studying: {category}
          </h1>
          <FlashcardSet category={category} studyMode={true} />
        </>
      )}
    </div>
  );
};
export default StudyUI;
