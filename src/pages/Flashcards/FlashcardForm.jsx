import useFlashcards from "./useFlashcards";
import saveFlashcard from "./saveFlashcard";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import useLog from "../../hooks/useLog.js";
import { useEffect, useState } from "react";
import CodeEditor from "../../components/CodeEditor.jsx";
import useToggle from "../../hooks/useToggle.js";
import processCategories from "../../utils/processCategories";

const FlashcardForm = ({ index, hideSaveButton, updateFlashcard }) => {
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
    deleteFlashcard,
  } = useFlashcards();

  const { user } = useAuth();

  const [showCategoriesSection, toggleCategories] = useToggle(false);
  const [showCodeSection, toggleCode] = useToggle(false);
  const [codeMode, toggleCodeMode] = useToggle(false);
  const [flashcards, setFlashcards] = useState([]);

  const handleSaveFlashcard = (
    editedQuestion,
    editedAnswer,
    editedCategories,
    editedCode,
  ) => {
    const questionToSave =
      editedQuestion === "" || editedQuestion === placeholders.question
        ? question
        : editedQuestion;
    const answerToSave =
      answer === "" || answer === placeholders.answer ? answer : editedAnswer;
    const categoryToUse =
      editedCategories === "" || editedCategories === placeholders.category
        ? category
        : editedCategories;
    const flashcard = {
      question: questionToSave,
      answer: answerToSave,
      categories: categoryToUse,
    };
    // Process categories
    let processedCategories = [];
    if (categoryToUse) {
      processedCategories = processCategories(categoryToUse);
    }

    setFlashcards({
      question: questionToSave,
      answer: answerToSave,
      categories: processedCategories,
      code: editedCode,
    });

    useEffect(() => {
      saveFlashcard(flashcards, user);
    }, [flashcards]);

    return {
      isSaved: true,
    };
  };

  return (
    <div className="flashcard-form p-4">
      <div className="qanda-container flex w-full gap-4">
        <div className="question-container flex-1">
          <label className="mb-2 text-lg">Front (Question)</label>
          {codeMode ? (
            <CodeEditor
              value={editedQuestion}
              language="javascript"
              onChange={(event) => {
                const newValue = event.target.value;
                setEditedQuestion(newValue);
                if (updateFlashcard) {
                  updateFlashcard(index, newValue, "question"); // ✅ Send update to parent
                }
              }}
            />
          ) : (
            <textarea
              className="textarea textarea-long mb-0"
              value={editedQuestion}
              onChange={(event) => {
                const newValue = event.target.value;
                setEditedQuestion(newValue);
                if (updateFlashcard) {
                  updateFlashcard(index, newValue, "question"); // ✅ Send update to parent
                }
              }}
              required
              placeholder="This will be the front of your flashcard"></textarea>
          )}

          <Button
            btntext={"Code Mode"}
            cssClasses={"btn btn-no-color"}
            onClick={() => toggleCodeMode()}></Button>
        </div>
        <div className="answer-container flex-1">
          <label className="mb-2 text-lg">Back (Answer)</label>
          <textarea
            className="textarea textarea-long mb-0"
            value={editedAnswer}
            onChange={(event) => {
              const newValue = event.target.value;
              setEditedAnswer(newValue);
              if (updateFlashcard) {
                updateFlashcard(index, newValue, "answer"); // ✅ Send update to parent
              }
            }}
            required
            placeholder="This will be the back of your flashcard"></textarea>
        </div>
      </div>
      <div className="flex">
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
            value={editedCategories}
            onChange={(event) => {
              const newValue = event.target.value;
              setEditedCategories(newValue);
              if (updateFlashcard) {
                updateFlashcard(index, newValue, "categories"); // ✅ Send update to parent
              }
            }}></textarea>
        </div>
      )}

      {showCodeSection && (
        <div className="code-container">
          <label className="mb-2 text-lg">Code Example</label>
          <CodeEditor
            value={editedCode}
            language="javascript"
            onChange={(event) => {
              const newValue = event.target.value;
              setEditedCode(newValue);
              if (updateFlashcard) {
                updateFlashcard(index, newValue, "code");
              }
            }}
          />
        </div>
      )}
      {!hideSaveButton && (
        <div className="btn-container flex gap-4">
          <Button
            onClick={() =>
              handleSaveFlashcard(
                editedQuestion,
                editedAnswer,
                editedCategories,
                editedCode,
              )
            }
            cssClasses="btn btn-primary"
            btntext={"Save"}></Button>

          {/* <Button
          btntext={"Back"}
          onClick={() => setEditMode(false)}
          cssClasses={"btn btn-primary"}></Button> */}
        </div>
      )}
    </div>
  );
};

export default FlashcardForm;
