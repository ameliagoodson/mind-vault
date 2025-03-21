import useFlashcards from "./useFlashcards";
import saveFlashcard from "./saveFlashcard";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import CodeEditor from "../../components/CodeEditor.jsx";
import useToggle from "../../hooks/useToggle.js";
import processCategories from "../../utils/processCategories";
import { MdCode, MdAbc, MdSave, MdDelete } from "react-icons/md";
import Loading from "../../components/LoadingSpinner.jsx";
import useLog from "../../hooks/useLog.js";
import SaveButton from "../../components/SaveButton.jsx";
import LoadingSpinnerLarge from "../../components/LoadingSpinnerLarge.jsx";

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

  // Initialize editedFlashcard with current flashcard data
  useEffect(() => {
    if (flashcard) {
      // console.log("Setting editedFlashcard with:", flashcard);

      setEditedFlashcard({
        question: flashcard.question || "",
        answer: flashcard.answer || "",
        category: flashcard.category || "",
        code: flashcard.code || "",
      });
    }
  }, [flashcard]);

  const handleSaveFlashcard = async () => {
    toggleLoading(true);

    try {
      const categoryToUse =
        editedFlashcard.category || flashcard?.category || "";

      let processedCategories = [];
      if (categoryToUse) {
        processedCategories = processCategories(categoryToUse);
      }

      const updatedFlashcard = {
        id: flashcard?.id, // Include the ID here - this is the key fix!
        question: editedFlashcard.question || flashcard?.question || "",
        answer: editedFlashcard.answer || flashcard?.answer || "",
        category: categoryToUse,
        code: editedFlashcard.code || flashcard?.code || "",
      };

      const saveData = {
        ...updatedFlashcard,
        category: processedCategories,
      };

      // Log to confirm ID is included
      console.log("Saving flashcard with ID:", saveData.id);

      // Await the save to database
      await saveFlashcard([saveData], user);

      // Update the parent component's state with the new values
      if (updateFlashcard) {
        console.log("Updating parent component with:", updatedFlashcard);
        updateFlashcard(updatedFlashcard);
        handleSaveSuccess();
      }

      console.log("✅ Flashcard saved & exiting Edit Mode.");
    } catch (error) {
      console.error("Error saving flashcard:", error);
    } finally {
      // Always run this code whether the save succeeds or fails
      toggleLoading(false);

      // Exit edit mode if needed
      if (toggleEditing) {
        toggleEditing(false);
      }
    }
  };

  return (
    <div className="flashcard-form bg-slate-200 p-4">
      <div className="qanda-container flex w-full flex-col gap-4">
        <div className="question-container flex-1">
          <label className="mb-2 text-lg">Front (Question)</label>
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
                  setEditedFlashcard((prev) => ({
                    ...prev,
                    question: event.target.value,
                  }));

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
          <textarea
            className="textarea"
            value={editedFlashcard?.category || ""}
            onChange={(event) => {
              setEditedFlashcard((prev) => ({
                ...prev,
                category: event.target.value,
              }));

              // ALSO update parent component's state if updateFlashcard exists
              if (updateFlashcard && index !== undefined) {
                updateFlashcard(index, event.target.value, "category");
              }
            }}
          />
        </div>
      )}

      {showCodeSection ||
        (flashcard.code && (
          <div className="code-container">
            <label className="mb-2 text-lg">Code Example</label>
            <CodeEditor
              value={editedFlashcard?.code || ""}
              language="javascript"
              onChange={(event) => {
                setEditedFlashcard((prev) => ({
                  ...prev,
                  code: event.target.value,
                }));
                // ALSO update parent component's state if updateFlashcard exists
                if (updateFlashcard && index !== undefined) {
                  updateFlashcard(index, event.target.value, "code");
                }
              }}
            />
          </div>
        ))}
      {!hideSaveButton && (
        <div className="btn-container flex gap-4">
          <SaveButton
            onClick={handleSaveFlashcard}
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
