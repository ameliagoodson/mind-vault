// ✅ Displays next/previous buttons
// ✅ Shows progress (e.g., "Card 1 of 10")
// ✅ Calls a function to change the active flashcard

import { useFilterFlashcards } from "../../hooks/useFilterFlashcards";

const FlashcardNavigation = ({ currentCard, setCurrentCard }) => {
  const { filteredFlashcards } = useFilterFlashcards();

  console.log("card:", filteredFlashcards[currentCard]);
  console.log("card index: ", currentCard);

  const handleNavigation = (navigation) => {
    const current = currentCard;
    const length = filteredFlashcards.length;

    if (navigation === "prev" && number > 0) {
      const newCardIndex = current - 1;
      setCurrentCard(newCardIndex);
    } else if (number === 1 && number < length) {
      const newCardIndex = current + 1;
      setCurrentCard(newCardIndex);
    }
  };
  return (
    <div className="mx-auto flex max-w-72 items-center justify-between">
      <button onClick={() => handleNavigation("prev")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="currentColor"
          className="text-primary hover:text-primary-dark h-14 w-14">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
      <div className="text-lg">
        <span>
          {currentCard + 1} / {filteredFlashcards.length}{" "}
        </span>
      </div>
      <button onClick={() => handleNavigation("next")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="currentColor"
          className="text-primary hover:text-primary-dark h-14 w-14">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default FlashcardNavigation;
