import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Flashcard from "./Flashcard";
import { handleAPIRequest } from "../../api/openAIUtils";

const CreateFlashcard = () => {
  const { user } = useAuth(); // Get logged-in user
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [category, setCategory] = useState("");
  const [code, setCode] = useState("");
  const [resetFlashcardContent, setResetFlashcardContent] = useState();

  const handleReset = () => {
    setQuery("");
    setResponse("");
    setCategory("");
    setExample("");

    setResetFlashcardContent(true);
  };

  return (
    <div className="m-auto max-w-4xl">
      <div className="dashboard-intro">
        <h1>Dashboard</h1>
        <h2 className="text-h4">Hi {user.email}</h2>
      </div>
      <div className="interface-wrapper">
        <div className="interface mt-18 gap-8 md:flex">
          <div className="flex-col justify-center md:w-1/2">
            {/* CHAT INTERFACE */}
            <textarea
              className="text-area min-h-60"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="What do you want to ask ChatGPT to turn into a flashcard?"></textarea>

            <div className="flex justify-around">
              <button onClick={() => handleReset()} className="btn btn-primary">
                Clear
              </button>

              {/* CALL API */}
              <button
                onClick={() => {
                  handleAPIRequest(
                    query,
                    setResponse,
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
              query={query}
              response={response}
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
