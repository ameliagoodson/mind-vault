import { handleNavigation } from "./handleFlashcardNavigation.js";

const FlashcardArrows = ({
  filteredFlashcards,
  currentCard,
  isDisabled,
  setIsDisabled,
  setCurrentCard,
}) => {
  return (
    <div className="mx-auto flex max-w-72 items-center justify-between">
      <button
        onClick={() =>
          handleNavigation({
            navigation: "prev",
            filteredFlashcards,
            currentCard,
            setCurrentCard,
            setIsDisabled,
          })
        }
        className={isDisabled.disablePrev ? "icon-disabled" : ""}
        disabled={isDisabled.disablePrev === true}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="currentColor"
          className={
            isDisabled.disablePrev
              ? "icon-disabled h-14 w-14 text-slate-400"
              : "text-primary hover:text-primary-dark h-14 w-14"
          }>
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

      <button
        onClick={() =>
          handleNavigation({
            navigation: "next",
            filteredFlashcards,
            currentCard,
            setCurrentCard,
            setIsDisabled,
          })
        }
        className={isDisabled.disableNext ? "icon-disabled" : ""}
        disabled={isDisabled.disableNext}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="currentColor"
          className={
            isDisabled.disableNext
              ? "icon-disabled h-14 w-14 text-slate-400"
              : "text-primary hover:text-primary-dark h-14 w-14"
          }>
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

export default FlashcardArrows;
