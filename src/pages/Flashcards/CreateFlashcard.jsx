import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Flashcard from "./Flashcard";
import { handleAPIRequest } from "../../api/openAIUtils";
import AIFlashcardCreator from "./AIFlashcardCreator";
import ManualFlashcardCreator from "./ManualFlashcardCreator";
import useToggle from "../../hooks/useToggle";
import Button from "../../components/Button";
import classNames from "classnames";

const CreateFlashcard = () => {
  const { user } = useAuth();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [code, setCode] = useState("");

  const [flashcardModeAI, toggle] = useToggle(true);

  return (
    <div className="m-auto h-full w-full max-w-5xl">
      <h1>Create Flashcards</h1>
      <div className="flashcard-toggle-container max-h-[80vh] overflow-auto bg-white">
        <div className="toggle-btn-container mx-auto flex flex-row items-center justify-center gap-4">
          <Button
            btntext={"Manual"}
            onClick={() => flashcardModeAI && toggle(flashcardModeAI)}
            cssClasses={classNames("btn mb-4", {
              "btn-primary": !flashcardModeAI,
              "btn-secondary": flashcardModeAI,
            })}></Button>
          <Button
            btntext={"AI Assistant"}
            onClick={() => !flashcardModeAI && toggle(flashcardModeAI)}
            cssClasses={classNames("btn mb-4", {
              "btn-primary": flashcardModeAI,
              "btn-secondary": !flashcardModeAI,
            })}></Button>
        </div>
        {flashcardModeAI ? <AIFlashcardCreator /> : <ManualFlashcardCreator />}
      </div>
    </div>
  );
};

export default CreateFlashcard;
