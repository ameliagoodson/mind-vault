import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Flashcard from "./Flashcard";
import { handleAPIRequest } from "../../api/openAIUtils";
import AIFlashcardCreator from "./AIFlashcardCreator";

const CreateFlashcard = () => {
  const { user } = useAuth();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [code, setCode] = useState("");
  const [resetFlashcardContent, setResetFlashcardContent] = useState();

  const handleReset = () => {
    setQuestion("");
    setAnswer("");
    setCategory("");
    setCode("");

    setResetFlashcardContent(true);
  };

  return (
    <div className="m-auto w-full max-w-5xl">
      <h1>Create a Flashcard</h1>
      <div className="flashcard-toggle-container max-h-[70vh] overflow-hidden bg-neutral-200">
        <AIFlashcardCreator />
      </div>
    </div>
  );
};

export default CreateFlashcard;
