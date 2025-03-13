import FlashcardForm from "./FlashcardForm";
import Button from "../../components/Button";
import useToggle from "../../hooks/useToggle";
import { useState } from "react";
import Flashcard from "./Flashcard";
import useLog from "../../hooks/useLog";

const ManualFlashcardCreator = () => {
  const [flashcards, setFlashcards] = useState([
    {
      question: "",
      answer: "",
      category: "",
      code: "",
    },
  ]);

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

  const deleteCard = (card, targetIndex) => {
    setFlashcards(flashcards.filter((_, index) => index !== targetIndex));
  };

  useLog(flashcards);
  return (
    <div className="manualflashcardcreator container mx-auto flex h-[80vh] max-w-4xl flex-col">
      <div className="h-[65vh] bg-white">
        {flashcards.map((card, index) => (
          <div>
            <FlashcardForm key={index} cardData={card} />
            <Button
              onClick={() => deleteCard(card, index)}
              btntext={"Delete"}
              cssClasses={"btn btn-primary btn-small"}
            />
          </div>
        ))}
        <Button
          onClick={addNewCard}
          btntext={"Add flashcard"}
          cssClasses={"btn btn-primary btn-small"}
        />
      </div>
    </div>
  );
};

export default ManualFlashcardCreator;
