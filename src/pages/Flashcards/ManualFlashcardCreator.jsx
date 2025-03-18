import FlashcardForm from "./FlashcardForm";
import Button from "../../components/Button";
import useToggle from "../../hooks/useToggle";
import { useState } from "react";
import Flashcard from "./Flashcard";
import useLog from "../../hooks/useLog";
import saveFlashcard from "./saveFlashcard";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../components/Loading";

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

            {/* Keep one blank flashcard as a placeholder ie don't allow user to delete the first flashcard*/}
            {flashcards.length > 1 && index > 0 && (
              <Button
                onClick={() => deleteCard(card, index)}
                btntext={"Delete"}
                cssClasses={"btn btn-primary"}
              />
            )}
          </div>
        ))}
        <Button
          btntext={"Save all"}
          cssClasses={"btn btn-primary"}
          onClick={handleSave}></Button>

        {isLoading && (
          <div className="loading-container">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManualFlashcardCreator;
