import useFlashcards from "./useFlashcards";
import saveFlashcard from "./saveFlashcard";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import useLog from "../../hooks/useLog.js";
import { useEffect, useState } from "react";
import CodeEditor from "../../components/CodeEditor.jsx";
import useToggle from "../../hooks/useToggle.js";

const FlashcardForm = (index, card) => {
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

  return (
    <div className="flashcard-form p-4">
      <div className="qanda-container flex w-full gap-4">
        <div className="question-container flex-1">
          <label className="mb-2 text-lg">Front (Question)</label>
          <textarea
            className="textarea textarea-long mb-0"
            value={editedQuestion}
            onChange={(event) => setEditedQuestion(event.target.value)}
            required
            placeholder="This will be the front of your flashcard"></textarea>
        </div>
        <div className="answer-container flex-1">
          <label className="mb-2 text-lg">Back (Answer)</label>
          <textarea
            className="textarea textarea-long mb-0"
            value={editedAnswer}
            onChange={(event) => setEditedAnswer(event.target.value)}
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
            onChange={(event) =>
              setEditedCategories(event.target.value)
            }></textarea>
        </div>
      )}

      {showCodeSection && (
        <div className="code-container">
          <label className="mb-2 text-lg">Code Example</label>
          <CodeEditor
            value={editedCode}
            language="javascript"
            onChange={(event) => setEditedCode(event.target.value)}
          />
        </div>
      )}

      <div className="btn-container flex gap-4">
        <Button
          onClick={() =>
            saveFlashcard({
              user,
              editedQuestion,
              editedAnswer,
              editedCategories,
              editedCode,
            })
          }
          cssClasses="btn btn-primary"
          btntext={"Save"}></Button>
        {/* <Button
          btntext={"Back"}
          onClick={() => setEditMode(false)}
          cssClasses={"btn btn-primary"}></Button> */}
      </div>
    </div>
  );
};

export default FlashcardForm;
