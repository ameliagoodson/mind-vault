import FlashcardForm from "./FlashcardForm";
import Button from "../../components/Button";
import useToggle from "../../hooks/useToggle";
import { useState } from "react";
import Flashcard from "./Flashcard";
import useLog from "../../hooks/useLog";
import saveFlashcard from "./saveFlashcard";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinnerLarge from "../../components/LoadingSpinnerLarge";
import { MdSave } from "react-icons/md";
import useFlashcards from "./useFlashcards";
import SaveButton from "../../components/SaveButton";

const ManualFlashcardCreator = () => {
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState([
    {
      question: "",
      answer: "",
      category: "",
      code: "",
    },
  ]);
  const [isLoading, toggleLoading] = useToggle(false);
  const { isSaved, setIsSaved } = useFlashcards();

  // ADD CARD
  const addNewCard = () => {
    setFlashcards([
      ...flashcards,
      {
        question: "",
        answer: "",
        category: "",
        code: "",
      },
    ]);
    setIsSaved(false);
  };

  // DELETE CARD
  const deleteCard = (card, targetIndex) => {
    setFlashcards(flashcards.filter((_, index) => index !== targetIndex));
  };

  const handleSave = async () => {
    toggleLoading(true);

    try {
      // Wait for the save operation to complete
      await saveFlashcard(flashcards, user);

      console.log("✅ All flashcards saved successfully!");
    } catch (error) {
      console.error("Error saving flashcards:", error);
    } finally {
      // This will run whether the save succeeds or fails
      toggleLoading(false);
      setIsSaved(true);
    }
  };

  // Get field values from textareas when they change in FlashcardForm
  const updateFlashcard = (index, value, field) => {
    const newFlashcards = getUpdatedFlashcards(index, value, field);
    console.log("Updated flashcards array:", newFlashcards);

    setFlashcards(newFlashcards);
  };

  const getUpdatedFlashcards = (index, value, field) => {
    const updatedFlashcards = [...flashcards]; // Create new array
    const currentFlashcard = { ...flashcards[index] }; // Create new object - state data must be immutable (new)
    currentFlashcard[field] = value; // Update the flashcard field
    updatedFlashcards[index] = currentFlashcard; // Update the flashcard in the flashcard array

    return updatedFlashcards;
  };

  return (
    <div className="manualflashcardcreator container mx-auto flex h-[80vh] max-w-4xl flex-col">
      <div className="relative bg-white">
        {/* h-[65vh] */}
        {flashcards.map((card, index) => (
          <div key={index} className="flashcard-form-container mb-4">
            <FlashcardForm
              index={index}
              hideSaveButton={true}
              updateFlashcard={updateFlashcard}
              deleteCard={() => deleteCard(card, index)}
              showDeleteButton={flashcards.length > 1 && index > 0}
            />
          </div>
        ))}
        {isLoading && (
          <div className="loading-container">
            <LoadingSpinnerLarge size="10rem" />
          </div>
        )}
      </div>
      <div className="btn-container mb-4 flex gap-4">
        <Button
          onClick={addNewCard}
          btntext={"Add flashcard"}
          cssClasses={"add-flashcard-btn btn btn-primary"}
        />
        <SaveButton
          btntext={"Save all"}
          onClick={handleSave}
          isSaved={isSaved}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ManualFlashcardCreator;
