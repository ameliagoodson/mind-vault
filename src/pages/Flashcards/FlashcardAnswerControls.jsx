import { handleAnswers } from "../../utils/handleAnswers.js";
import { handleNavigation } from "./handleFlashcardNavigation.js";

const FlashcardAnswerControls = ({
  filteredFlashcards,
  currentCard,
  setCurrentCard,
  correctCount,
  finalCard,
  setIsFinished,
}) => {
  return (
    <div className="mx-auto flex max-w-72 items-center justify-between">
      {/* INCORRECT */}
      <button
        onClick={() => {
          handleNavigation({
            navigation: "next",
            filteredFlashcards,
            currentCard,
            setCurrentCard,
            finalCard,
            setIsFinished,
          });
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="currentColor"
          className="h-14 w-14 text-red-500 hover:text-red-600">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 9l6 6m0-6l-6 6"
          />
        </svg>
      </button>

      {/* CORRECT */}
      <button
        onClick={() => {
          correctCount += correctCount + 1;
          handleNavigation({
            navigation: "next",
            filteredFlashcards,
            currentCard,
            setCurrentCard,
            finalCard,
            setIsFinished,
          });
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="currentColor"
          className="h-14 w-14 text-green-500 hover:text-green-600">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12l2.5 2.5L16 9"
          />
        </svg>
      </button>
    </div>
  );
};

export default FlashcardAnswerControls;
