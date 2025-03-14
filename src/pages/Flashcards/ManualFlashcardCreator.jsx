import FlashcardForm from "./FlashcardForm";
import Button from "../../components/Button";
import useToggle from "../../hooks/useToggle";
import { useState } from "react";
import Flashcard from "./Flashcard";
import useLog from "../../hooks/useLog";
import saveFlashcard from "./saveFlashcard";
import { useAuth } from "../../context/AuthContext";

const ManualFlashcardCreator = () => {
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState([
    {
      question: "",
      answer: "",
      categories: "",
      code: "",
    },
  ]);

  const addNewCard = () => {
    setFlashcards([
      ...flashcards,
      {
        question: "",
        answer: "",
        categories: "",
        code: "",
      },
    ]);
  };

  const deleteCard = (card, targetIndex) => {
    setFlashcards(flashcards.filter((_, index) => index !== targetIndex));
  };

  const getUpdatedFlashcards = (index, value, field) => {
    const updatedFlashcards = [...flashcards]; // Create new array
    const currentFlashcard = { ...flashcards[index] }; // Create new object - state data must be immutable (new)
    currentFlashcard[field] = value; // Update the flashcard field
    updatedFlashcards[index] = currentFlashcard; // Update the flashcard in the flashcard array

    return updatedFlashcards;
  };

  const updateFlashcard = (index, value, field) => {
    const newFlashcards = getUpdatedFlashcards(index, value, field);
    setFlashcards(newFlashcards);
  };

  return (
    <div className="manualflashcardcreator container mx-auto flex h-[80vh] max-w-4xl flex-col">
      <div className="h-[65vh] bg-white">
        <Button
          onClick={addNewCard}
          btntext={"Add flashcard"}
          cssClasses={"btn btn-primary"}
        />
        {flashcards.map((card, index) => (
          <div key={index} className="flashcard-form-container">
            <FlashcardForm
              index={index}
              hideSaveButton={true}
              updateFlashcard={updateFlashcard}
            />
            <Button
              onClick={() => deleteCard(card, index)}
              btntext={"Delete"}
              cssClasses={"btn btn-primary"}
            />
          </div>
        ))}
        <Button
          btntext={"Save all"}
          cssClasses={"btn btn-primary"}
          onClick={() => saveFlashcard(flashcards, user)}></Button>
      </div>
    </div>
  );
};

export default ManualFlashcardCreator;
