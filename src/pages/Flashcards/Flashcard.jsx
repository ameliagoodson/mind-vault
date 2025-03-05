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
  example,
  type,
  resetFlashcardContent,
}) => {
  // Defining variables by destructuring
  const {
    editedQuestion,
    editedAnswer,
    editedCategories,
    isSaved,
    editMode,
    setEditedQuestion,
    setEditedAnswer,
    setEditedCategories,
    setIsSaved,
    setEditMode,
    editFlashcard,
  } = useFlashcards(query, response, category, example);

  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // RESET
  useEffect(() => {
    if (resetFlashcardContent) {
      setEditedQuestion(placeholders.question);
      setEditedAnswer(placeholders.answer);
      setEditedCategories(placeholders.category);

      setIsSaved(false);
    }
  }, [resetFlashcardContent]);

  return (
    <div>
      <div
        className={classNames("flashcard", {
          "flashcard-preview": type === "preview",
          "flashcard-modal": type === "modal",
        })}>
        <div className="flashcard-body w-full">
          {editMode == true ? (
            // EDIT
            <div className="edit-mode">
              <label className="mb-4 text-2xl">Front</label>
              <textarea
                className="text-area"
                value={editedQuestion}
                onChange={(event) =>
                  setEditedQuestion(event.target.value)
                }></textarea>
              <label className="text-2xl">Back</label>
              <textarea
                className="text-area"
                value={editedAnswer}
                onChange={(event) =>
                  setEditedAnswer(event.target.value)
                }></textarea>
              <label className="text-lg">Categories</label>
              <textarea
                className="text-area"
                value={editedCategories}
                onChange={(event) =>
                  setEditedCategories(event.target.value)
                }></textarea>
            </div>
          ) : (
            // VIEW
            <div className="view-mode">
              <h4 className="mb-6 text-2xl">
                {isSaved ? editedQuestion : query || placeholders.question}
              </h4>
              <h4 className="text-2xl">
                {isSaved ? editedAnswer : response || placeholders.answer}
              </h4>
              {example ? (
                <SyntaxHighlighter
                  language="javascript"
                  wrapLongLines={true}
                  style={nightOwl}>
                  {example}
                </SyntaxHighlighter>
              ) : (
                ""
              )}
              <h6>
                {isSaved ? editedCategories : category || placeholders.category}
              </h6>
              <div className="flex justify-around">
                <button
                  onClick={() => editFlashcard(query, response, category, user)}
                  className="btn btn-primary">
                  Edit
                </button>
                <button
                  onClick={() =>
                    saveFlashcard(
                      query,
                      response,
                      category,
                      user,
                      editedQuestion,
                      editedAnswer,
                      editedCategories,
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
    </div>
  );
};

export default Flashcard;
