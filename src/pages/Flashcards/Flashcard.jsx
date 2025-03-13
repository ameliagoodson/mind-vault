import classNames from "classnames";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useFlashcards from "./useFlashcards";
import saveFlashcard from "./saveFlashcard";
import placeholders from "../../data/placeholders";
import Button from "../../components/Button";

const Flashcard = ({
  id,
  question,
  answer,
  category,
  code,
  type,
  resetFlashcardContent,
  deleteFlashcard,
}) => {
  // Defining variables by destructuring
  const { isSaved, editMode, setIsSaved, setEditMode, editFlashcard } =
    useFlashcards();

  const { user } = useAuth();

  // RESET
  useEffect(() => {
    if (resetFlashcardContent) {
      setEditedQuestion(placeholders.question);
      setEditedAnswer(placeholders.answer);
      setEditedCategories(placeholders.category);
      setEditedCode("");

      setIsSaved(false);
    }
  }, [resetFlashcardContent]);

  return (
    <div
      className={classNames("flashcard", {
        "flashcard-preview": type === "preview",
        "flashcard-modal": type === "modal",
      })}>
      <div className="flashcard-body w-full overflow-scroll">
        <div className="view-mode">
          <p className="mb-6">
            {isSaved ? editedQuestion : question || placeholders.question}
          </p>
          <p className="mb-4">
            {isSaved ? editedAnswer : answer || placeholders.answer}
          </p>
          {code ? (
            <SyntaxHighlighter
              language="javascript"
              wrapLongLines={true}
              style={nightOwl}>
              {code}
            </SyntaxHighlighter>
          ) : (
            ""
          )}
          <span>
            {isSaved ? editedCategories : category || placeholders.category}
          </span>
          <div className="btn-container mt-4 flex">
            <button
              onClick={() =>
                editFlashcard(question, answer, category, code, user)
              }
              className="btn btn-primary mr-4">
              Edit
            </button>
            <button
              onClick={() =>
                saveFlashcard({
                  question,
                  answer,
                  category,
                  code,
                  user,
                  editedQuestion,
                  editedAnswer,
                  editedCategories,
                  editedCode,
                })
              }
              className="btn btn-primary mr-4">
              Save
            </button>
            <Button
              btntext={"Delete"}
              onClick={() => deleteFlashcard(id, user)}
              cssClasses={"btn btn-primary"}></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
