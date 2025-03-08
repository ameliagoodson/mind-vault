import classNames from "classnames";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useFlashcards from "./useFlashcards";
import saveFlashcard from "./saveFlashcard";
import placeholders from "../../data/placeholders";

const Flashcard = ({
  query,
  response,
  category,
  code,
  type,
  resetFlashcardContent,
}) => {
  // Defining variables by destructuring
  const {
    editedQuestion,
    editedAnswer,
    editedCategories,
    editedCode,
    isSaved,
    editMode,
    setEditedQuestion,
    setEditedAnswer,
    setEditedCategories,
    setEditedCode,
    setIsSaved,
    setEditMode,
    editFlashcard,
  } = useFlashcards(query, response, category, code);

  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

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
        {editMode == true ? (
          // EDIT
          <div className="edit-mode">
            <label className="mb-2 text-lg">Front</label>
            <textarea
              className="textarea"
              value={editedQuestion}
              onChange={(event) =>
                setEditedQuestion(event.target.value)
              }></textarea>
            <label className="mb-2 text-lg">Back</label>
            <textarea
              className="textarea textarea-long"
              value={editedAnswer}
              onChange={(event) =>
                setEditedAnswer(event.target.value)
              }></textarea>
            <label className="mb-2 text-lg">Categories</label>
            <textarea
              className="textarea"
              value={editedCategories}
              onChange={(event) =>
                setEditedCategories(event.target.value)
              }></textarea>
            <label className="mb-2 text-lg">Example</label>
            <textarea
              className="textarea"
              value={editedCode}
              onChange={(event) =>
                setEditedCode(JSON.stringify(event.target.value))
              }></textarea>
          </div>
        ) : (
          // VIEW
          <div className="view-mode">
            <p className="mb-6">
              {isSaved ? editedQuestion : query || placeholders.question}
            </p>
            <p className="mb-4">
              {isSaved ? editedAnswer : response || placeholders.answer}
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
                  editFlashcard(query, response, category, code, user)
                }
                className="btn btn-primary mr-4">
                Edit
              </button>
              <button
                onClick={() =>
                  saveFlashcard(
                    query,
                    response,
                    category,
                    code,
                    user,
                    editedQuestion,
                    editedAnswer,
                    editedCategories,
                    editedCode,
                  )
                }
                className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
