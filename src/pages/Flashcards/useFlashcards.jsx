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

  // Return all the functions and state values the component needs
  return {
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
  };
};
export default useFlashcards;
