import classNames from "classnames";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useFlashcards from "./useFlashcards";
import saveFlashcard from "./saveFlashcard";
import placeholders from "../../data/placeholders";
import Button from "../../components/Button";
import FlashcardForm from "./FlashcardForm";
import useToggle from "../../hooks/useToggle";
import { MdEdit, MdSave, MdClose, MdDelete } from "react-icons/md";

const Flashcard = ({
  id,
  flashcard,
  type,
  resetFlashcardContent,
  deleteFlashcard,
}) => {
  const { question, answer, code, category } = flashcard;
  const { isSaved, setIsSaved } = useFlashcards();
  const { user } = useAuth();
  const [isEditing, toggleEditing] = useToggle(false);
  const [flashcardData, setFlashcardData] = useState({
    id,
    question,
    answer,
    category,
    code,
  });

  const { editedFlashcard, setEditedFlashcard } = useFlashcards();

  // Update flashcardData when props change
  useEffect(() => {
    console.log("ID from props:", id);
    console.log("flashcard from props:", flashcard);

    setFlashcardData({
      id,
      question,
      answer,
      category,
      code,
    });
  }, [question, answer, category, code]);

  useEffect(() => {
    console.log("isEditing is set to:", isEditing);
  }, [isEditing]);

  // RESET
  useEffect(() => {
    if (resetFlashcardContent) {
      setFlashcardData({
        question: placeholders.question,
        answer: placeholders.answer,
        category: placeholders.category,
        code: "",
      });
      setIsSaved(false);
    }
  }, [resetFlashcardContent]);

  // Handler to update the flashcard with edited data
  const updateFlashcardData = (updatedData) => {
    console.log("📝 Updating flashcard data:", updatedData);
    setFlashcardData(updatedData);
  };

  return (
    <div
      className={classNames("flashcard relative", {
        "flashcard-small": type === "small",
        "flashcard-modal": type === "modal",
      })}>
      {isEditing ? (
        <>
          <FlashcardForm
            flashcard={flashcardData}
            toggleEditing={toggleEditing}
            updateFlashcard={updateFlashcardData}
          />
          <Button
            onClick={() => toggleEditing(false)}
            cssClasses={"absolute top-2 right-2"}
            icon={<MdClose className="icon h-6 w-6" />}></Button>
        </>
      ) : (
        <div className="flashcard-body h-full w-full overflow-scroll">
          <div className="view-mode flex h-full flex-col justify-between">
            <p className="mb-6">
              {flashcardData.question || placeholders.question}
            </p>
            <p className="mb-4">
              {flashcardData.answer || placeholders.answer}
            </p>

            {flashcardData.code && flashcardData.code.trim() !== "// code" ? (
              <SyntaxHighlighter
                language="javascript"
                wrapLongLines={true}
                style={nightOwl}>
                {flashcardData.code}
              </SyntaxHighlighter>
            ) : (
              ""
            )}
            <span>{flashcardData.category || placeholders.category}</span>
            <div className="btn-container mt-4 flex">
              {/* EDIT */}
              <Button
                onClick={() => {
                  // Initialize the editedFlashcard with current values
                  setEditedFlashcard({
                    question: flashcardData.question || "",
                    answer: flashcardData.answer || "",
                    category: flashcardData.category || "",
                    code: flashcardData.code || "",
                  });
                  toggleEditing(true);
                }}
                cssClasses={"btn-icon mr-4"}
                icon={<MdEdit className="icon" />}
              />

              {/* SAVE */}
              <Button
                onClick={() => {
                  console.log(
                    "🚀 BUTTON CLICKED: Attempting to run saveFlashcard...",
                  );
                  console.log("ID directly from props:", id); // Check if id is defined
                  console.log("Entire flashcard prop:", flashcard); // Check the original flashcard object

                  // Create a data object with the ID explicitly included
                  const dataToSave = {
                    ...flashcardData,
                    id, // Include the ID from props directly
                  };

                  console.log("Data being saved with ID:", dataToSave);

                  // Save with the ID included
                  saveFlashcard([dataToSave], user);
                  setIsSaved(true);
                }}
                cssClasses={"btn-icon mr-4"}
                icon={<MdSave className="icon" />}
              />

              {/* DELETE */}
              <Button
                onClick={() => deleteFlashcard(id, user)}
                cssClasses={"btn-icon"}
                icon={<MdDelete className="icon" />}></Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
