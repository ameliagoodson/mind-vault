import useFlashcards from "./useFlashcards";
import saveFlashcard from "./saveFlashcard";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import useLog from "../../hooks/useLog.js";
import { useEffect, useState } from "react";
import CodeEditor from "../../components/CodeEditor.jsx";
import useToggle from "../../hooks/useToggle.js";
import processCategories from "../../utils/processCategories";
import { MdCode, MdAbc, MdSave } from "react-icons/md";

const FlashcardForm = ({
  flashcard,
  index,
  hideSaveButton,
  updateFlashcard,
  toggleEditing,
}) => {
  const { editedFlashcard, setEditedFlashcard } = useFlashcards();

  const { user } = useAuth();

  const [showCategoriesSection, toggleCategories] = useToggle(false);
  const [showCodeSection, toggleCode] = useToggle(false);
  const [codeMode, toggleCodeMode] = useToggle(false);

  // Initialize editedFlashcard with current flashcard data
  useEffect(() => {
    if (flashcard) {
      console.log("Setting editedFlashcard with:", flashcard);
      setEditedFlashcard({
        question: flashcard.question || "",
        answer: flashcard.answer || "",
        category: flashcard.category || "",
        code: flashcard.code || "",
      });
    }
  }, [flashcard]);

  const handleSaveFlashcard = () => {
    const categoryToUse = editedFlashcard.category || flashcard?.category || "";

    let processedCategories = [];
    if (categoryToUse) {
      processedCategories = processCategories(categoryToUse);
    }

    const updatedFlashcard = {
      question: editedFlashcard.question || flashcard?.question || "",
      answer: editedFlashcard.answer || flashcard?.answer || "",
      category: categoryToUse, // Use the raw category text for UI display
      code: editedFlashcard.code || flashcard?.code || "",
    };

    // Save to database with processed categories
    const saveData = {
      ...updatedFlashcard,
      category: processedCategories,
    };

    saveFlashcard([saveData], user);

    // Update parent component state
    if (updateFlashcard) {
      console.log("✅ Sending updated flashcard data to Flashcard.jsx");
      updateFlashcard(updatedFlashcard);
    }

    // Exit edit mode
    if (toggleEditing) {
      console.log("✅ Flashcard saved & exiting Edit Mode.");
      toggleEditing(false);
    }
  };

  return (
    <div className="flashcard-form p-4">
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
                }}
                required
                placeholder="This will be the front of your flashcard"
              />
            )}
            {codeMode ? (
              <Button
                cssClasses={"bg-white absolute bottom-2 right-2"}
                onClick={() => toggleCodeMode()}
                icon={
                  <MdAbc className="icon bg-neutral-dark text-white" />
                }></Button>
            ) : (
              <Button
                cssClasses={"bg-white absolute bottom-2 right-2"}
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
            }}
            required
            placeholder="This will be the back of your flashcard"
          />
        </div>
      </div>
      <div className="btn-container mb-4 flex">
        <Button
          onClick={() => toggleCategories(true)}
          btntext={"Add categories"}
          cssClasses={"btn btn-small btn-no-colour"}
        />
        <Button
          onClick={() => toggleCode(true)}
          btntext={"Add code example"}
          cssClasses={"btn btn-small btn-no-colour"}
        />
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
            }}
          />
        </div>
      )}

      {showCodeSection && (
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
            }}
          />
        </div>
      )}
      {!hideSaveButton && (
        <div className="btn-container flex gap-4">
          <Button
            onClick={handleSaveFlashcard}
            cssClasses="btn btn-primary"
            btntext={"Save"}
          />

          <Button
            btntext={"Cancel"}
            onClick={() => toggleEditing(false)}
            cssClasses={"btn btn-secondary"}
          />
        </div>
      )}
    </div>
  );
};

export default FlashcardForm;
