import AIFlashcardCreator from "./AIFlashcardCreator";
import ManualFlashcardCreator from "./ManualFlashcardCreator";
import useToggle from "../../hooks/useToggle";
import Button from "../../components/Button";
import classNames from "classnames";
import useLog from "../../hooks/useLog";

const CreateFlashcard = () => {
  const [flashcardModeAI, toggle] = useToggle(true);
  return (
    <div className="create-flashcard-container mx-auto flex max-w-5xl flex-1 flex-col overflow-hidden">
      <h1 className="text-h2 pb-4">
        Create Flashcards: Chat to Generate or Write Your Own
      </h1>
      <div className="flashcard-toggle-container flex flex-1 flex-col overflow-hidden bg-white p-4">
        <div className="toggle-btn-container mx-auto flex flex-row items-center justify-center gap-4">
          <Button
            btntext={"Manual"}
            onClick={() => flashcardModeAI && toggle(false)}
            cssClasses={classNames("btn mb-4", {
              "btn-primary": !flashcardModeAI,
              "btn-secondary": flashcardModeAI,
            })}></Button>
          <Button
            btntext={"AI Assistant"}
            onClick={() => !flashcardModeAI && toggle(true)}
            cssClasses={classNames("btn mb-4", {
              "btn-primary": flashcardModeAI,
              "btn-secondary": !flashcardModeAI,
            })}></Button>
        </div>
        <div className="flashcard-content flex-1 overflow-auto">
          {flashcardModeAI ? (
            <AIFlashcardCreator />
          ) : (
            <ManualFlashcardCreator />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateFlashcard;
