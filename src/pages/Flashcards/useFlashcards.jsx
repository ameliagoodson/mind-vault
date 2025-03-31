// Manages editing and deleting of flashcards
import { useState } from "react";
import useToggle from "../../hooks/useToggle";

const useFlashcards = () => {
  // Create state variables
  const [editedFlashcard, setEditedFlashcard] = useState({
    question: "",
    answer: "",
    category: [],
    code: "",
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isFlipped, setIsFlipped] = useState({});

  // Return all the functions and state values the component needs
  return {
    editedFlashcard,
    isSaved,
    setEditedFlashcard,
    setIsSaved,
    isFlipped,
    setIsFlipped,
  };
};
export default useFlashcards;
