import classNames from "classnames";
import { useState, useEffect } from "react";
import { saveToDB } from "../../firestore";
import { useAuth } from "../../context/AuthContext";

const Flashcard = ({
  query,
  response,
  type,
  resetFlashcardContent,
  category,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");
  const [editedCategories, seteditedCategories] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const { user } = useAuth(); // Get logged-in user

  const placeholders = {
    question: "Your question will appear here",
    answer: "Your answer will appear here",
    category: "Category",
  };

  // SAVE function uses local variables to determine final values
  const handleSave = () => {
    // Calculate what should be saved
    const questionToSave =
      editedQuestion === "" || editedQuestion === placeholders.question
        ? query
        : editedQuestion;

    const answerToSave =
      editedAnswer === "" || editedAnswer === placeholders.answer
        ? response
        : editedAnswer;

    const categoryToUse =
      editedCategories === "" || editedCategories === placeholders.category
        ? category
        : editedCategories;

    // Process categories
    let processedCategories;
    if (Array.isArray(categoryToUse)) {
      processedCategories = categoryToUse.map((item) => item.trim());
    } else {
      processedCategories = categoryToUse.split(",").map((item) => item.trim());
    }

    // Update state for next render
    setEditedQuestion(questionToSave);
    setEditedAnswer(answerToSave);
    seteditedCategories(processedCategories);
    setIsSaved(true);
    setEditMode(false);

    // Save to database
    saveToDB({
      user: user,
      question: questionToSave,
      answer: answerToSave,
      category: processedCategories,
    });
  };

  // EDIT function to switch to edit mode

  // Set initial value of inputs to the original query, response and category
  const handleEdit = () => {
    if (!isSaved) {
      setEditedQuestion(query);
      setEditedAnswer(response);
      seteditedCategories(category);
    }
    setEditMode(true);
  };

  // RESET
  useEffect(() => {
    if (resetFlashcardContent) {
      setEditedQuestion(placeholders.question);
      setEditedAnswer(placeholders.answer);
      seteditedCategories(placeholders.category);
      setIsSaved(false);
    }
  }, [resetFlashcardContent]);

  useEffect(() => {
    console.log("category has been updated: ", category);
  }, [category]);

  useEffect(() => {
    console.log("editedCategories has been updated: ", editedCategories);
  }, [editedCategories]);

  return (
    <div>
      <div
        className={classNames("flashcard", {
          "flashcard-preview": type === "preview",
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
                  seteditedCategories(event.target.value)
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
              <h6>
                {isSaved ? editedCategories : category || placeholders.category}
              </h6>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-around">
        <button onClick={() => handleEdit()} className="btn-primary">
          Edit
        </button>
        <button onClick={() => handleSave()} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
