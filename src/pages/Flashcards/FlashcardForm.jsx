import useFlashcards from "./useFlashcards";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import CodeEditor from "../../components/CodeEditor.jsx";
import useToggle from "../../hooks/useToggle.js";
import { MdCode, MdAbc, MdDelete } from "react-icons/md";
import useLog from "../../hooks/useLog.js";
import SaveButton from "../../components/SaveButton.jsx";
import LoadingSpinnerLarge from "../../components/LoadingSpinnerLarge.jsx";
import CreatableSelect from "react-select/creatable";
import { useFetchFlashcards } from "../../hooks/useFetchFlashcards.js";
import { handleSaveFlashcard } from "./handleSaveFlashcard.js";

const FlashcardForm = ({
  flashcard,
  index,
  hideSaveButton,
  updateFlashcard,
  toggleEditing,
  handleSaveSuccess,
  deleteCard,
  showDeleteButton,
}) => {
  const { editedFlashcard, setEditedFlashcard, isSaved } = useFlashcards();

  const { user } = useAuth();

  const [showCategoriesSection, toggleCategories] = useToggle(false);
  const [showCodeSection, toggleCode] = useToggle(false);
  const [codeMode, toggleCodeMode] = useToggle(false);
  const [isLoading, toggleLoading] = useToggle(false);
  const { categoriesList } = useFetchFlashcards();

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);

  useLog(editedFlashcard, "editedFlashcard is changing in flashcardForm");

  // Initialize editedFlashcard with current flashcard data
  useEffect(() => {
    if (flashcard) {
      setEditedFlashcard({
        question: flashcard.question || "",
        answer: flashcard.answer || "",
        category: flashcard.category || [],
        code: flashcard.code || "",
      });
    }
  }, [flashcard]);

  return (
    <div className="flashcard-form p-4">
      <div className="qanda-container flex w-full flex-col gap-4">
        <div className="question-container flex-1">
          <label className="flashcard-label mb-2 text-lg">
            Front (Question)
          </label>
          <div className="relative">
            {codeMode ? (
              <CodeEditor
                value={editedFlashcard?.question || ""}
                language="javascript"
                onChange={(event) => {
                  const newValue = event.target.value;

                  setEditedFlashcard((prev) => ({
                    ...prev,
                    question: newValue,
                  }));
                }}
              />
            ) : (
              <textarea
                className="textarea textarea-long mb-0"
                value={editedFlashcard?.question || ""}
                onChange={(event) => {
                  setEditedFlashcard((prev) => {
                    console.log("I'm changing the question");
                    return {
                      ...prev,
                      question: event.target.value,
                    };
                  });

                  // ALSO update parent component's state if updateFlashcard exists
                  if (updateFlashcard && index !== undefined) {
                    updateFlashcard(index, event.target.value, "question");
                  }
                }}
                required
                placeholder="This will be the front of your flashcard"
              />
            )}
            {codeMode ? (
              <Button
                cssClasses={
                  "abc-btn bg-white absolute bottom-2 right-2 hover:cursor-pointer"
                }
                onClick={() => toggleCodeMode()}
                icon={
                  <MdAbc className="icon bg-neutral-dark text-white" />
                }></Button>
            ) : (
              <Button
                cssClasses={
                  "code-btn bg-white absolute bottom-2 right-2 hover:cursor-pointer"
                }
                onClick={() => toggleCodeMode()}
                icon={<MdCode className="icon" />}></Button>
            )}
          </div>
        </div>
        <div className="answer-container flex-1">
          <label className="mb-2 text-lg">Back (Answer)</label>
          <textarea
            className="textarea textarea-long mb-0"
            value={editedFlashcard?.answer || ""}
            onChange={(event) => {
              console.log("I'm changing the answr");
              setEditedFlashcard((prev) => ({
                ...prev,
                answer: event.target.value,
              }));
              // ALSO update parent component's state if updateFlashcard exists
              if (updateFlashcard && index !== undefined) {
                updateFlashcard(index, event.target.value, "answer");
              }
            }}
            required
            placeholder="This will be the back of your flashcard"
          />
        </div>
      </div>
      <div className="btn-container flex gap-4">
        <Button
          onClick={() => toggleCategories()}
          btntext={"Categories"}
          cssClasses={"btn btn-small btn-no-colour"}
        />
        <Button
          onClick={() => toggleCode()}
          btntext={"Code example"}
          cssClasses={"btn btn-small btn-no-colour"}
        />
        {showDeleteButton && (
          <Button
            onClick={deleteCard}
            btntext={"Delete"}
            cssClasses={"btn btn-primary"}
            icon={<MdDelete className="mr-2" />}
          />
        )}
      </div>

      {showCategoriesSection && (
        <div className="categories-container">
          <label className="mb-2 text-lg">Categories</label>

          <CreatableSelect
            isClearable={isClearable}
            isSearchable={isSearchable}
            options={
              categoriesList?.map((cat) => ({ value: cat, label: cat })) || []
            }
            value={
              editedFlashcard.category?.map((cat) => ({
                value: cat,
                label: cat,
              })) || []
            }
            isMulti
            onChange={(event) => {
              setEditedFlashcard((prev) => ({
                ...prev,
                category: Array.isArray(event)
                  ? event.map((cat) => cat.value)
                  : [],
              }));
              // ALSO update parent component's state if updateFlashcard exists
              if (updateFlashcard && index !== undefined) {
                // loop through the array and get the value property only and add it a new array to pass
                updateFlashcard(
                  index,
                  event.map((catObject) => catObject.value, "category"),
                );
              }
            }}
          />
        </div>
      )}

      {(showCodeSection || flashcard?.code) && (
        <div className="code-container mt-4">
          <label className="mb-2 text-lg">Code Example</label>
          <CodeEditor
            value={editedFlashcard?.code || ""}
            language="javascript"
            onChange={(event) => {
              setEditedFlashcard((prev) => {
                console.log("I'm changing the code");
                return {
                  ...prev,
                  code: event.target.value,
                };
              });
              // ALSO update parent component's state if updateFlashcard exists
              if (updateFlashcard && index !== undefined) {
                updateFlashcard(index, event.target.value, "code");
              }
            }}
          />
        </div>
      )}
      {!hideSaveButton && (
        <div className="btn-container flex gap-4">
          <SaveButton
            onClick={() =>
              handleSaveFlashcard({
                editedFlashcard,
                flashcard,
                user,
                updateFlashcard,
                handleSaveSuccess,
                toggleLoading,
                toggleEditing,
              })
            }
            isLoading={isLoading}
            isSaved={isSaved}
          />

          <Button
            btntext={"Cancel"}
            onClick={() => toggleEditing(false)}
            cssClasses={"btn btn-secondary"}
          />
        </div>
      )}
      {isLoading && (
        <div className="loading-container">
          <LoadingSpinnerLarge />
        </div>
      )}
    </div>
  );
};

export default FlashcardForm;
