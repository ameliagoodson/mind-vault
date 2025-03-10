import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Flashcard from "./Flashcard";
import { handleAPIRequest } from "../../api/openAIUtils";

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
    <div className="m-auto w-full max-w-4xl">
      <div className="dashboard-intro">
        <h1>Create a Flashcard</h1>
        <h2 className="text-h4">Hi {user.email}</h2>
      </div>
      <div className="interface-wrapper">
        <div className="interface mt-18 gap-8 md:flex">
          <div className="flex-col justify-center md:w-1/2">
            {/* CHAT INTERFACE */}
            <textarea
              className="text-area min-h-60"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="What do you want to ask ChatGPT to turn into a flashcard?"></textarea>

            <div className="flex justify-around">
              <button onClick={() => handleReset()} className="btn btn-primary">
                Clear
              </button>

              {/* CALL API */}
              <button
                onClick={() => {
                  handleAPIRequest(
                    question,
                    setAnswer,
                    setCategory,
                    setCode,
                    setResetFlashcardContent,
                  );
                }}
                className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <Flashcard
              question={question}
              answer={answer}
              category={category}
              code={code}
              type="preview"
              resetFlashcardContent={resetFlashcardContent}
              setResetFlashcardContent={setResetFlashcardContent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFlashcard;
