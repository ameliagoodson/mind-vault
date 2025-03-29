// Manages editing and deleting of flashcards

import { saveToDB } from "../../firestore";
import { useId, useState } from "react";
import useToggle from "../../hooks/useToggle";

const useFlashcards = () => {
  // Create state variables
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");
  const [editedCategories, setEditedCategories] = useState("");
  const [editedCode, setEditedCode] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isFlipped, setIsFlipped] = useToggle(false);

  // Add editedFlashcard state to manage all fields in one object
  const [editedFlashcard, setEditedFlashcard] = useState({
    question: "",
    answer: "",
    category: [],
    code: "",
  });

  // Return all the functions and state values the component needs
  return {
    editedQuestion,
    editedAnswer,
    editedCategories,
    editedCode,
    editedFlashcard,
    isSaved,
    setEditedQuestion,
    setEditedAnswer,
    setEditedCategories,
    setEditedCode,
    setEditedFlashcard,
    setIsSaved,
    isFlipped,
    setIsFlipped,
  };
};
export default useFlashcards;
