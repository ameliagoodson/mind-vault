import { saveToDB } from "../../firestore";
import { useState } from "react";
import processCategories from "../../utils/processCategories"

const useFlashcards = () => {
  // Create state variables
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");
  const [editedCategories, setEditedCategories] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Define placeholders
  const placeholders = {
    question: "Question",
    answer: "Answer",
    category: "Category",
  };

  // EDIT function to switch to edit mode
  // Set initial value of inputs to the original query, response and category
  const editFlashcard = (query, response, category) => {
    if (!isSaved) {
      setEditedQuestion(query);
      setEditedAnswer(response);
      setEditedCategories(category);
    }
    setEditMode(true);
  };

  const saveFlashcard = (query, response, category, user) => {
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
    const processedCategories = processCategories(categoryToUse);

    // ✅ Update React state
    setEditedQuestion(questionToSave);
    setEditedAnswer(answerToSave);
    setEditedCategories(processedCategories);
    setIsSaved(true);
    setEditMode(false);

    // ✅ Save to Firestore using a separate service function
    saveToDB({
      user,
      question: questionToSave,
      answer: answerToSave,
      category: processedCategories,
    });
  };

  // Return all the functions and state values the component needs
  return {
    editedQuestion,
    editedAnswer,
    editedCategories,
    isSaved,
    editMode,
    placeholders,
    setEditedQuestion,
    setEditedAnswer,
    setEditedCategories,
    setIsSaved,
    setEditMode,
    editFlashcard,
    saveFlashcard,
  };
};
export default useFlashcards;
