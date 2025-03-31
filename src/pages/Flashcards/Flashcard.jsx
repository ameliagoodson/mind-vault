import classNames from "classnames";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useFlashcards from "./useFlashcards";
import saveFlashcard from "./saveFlashcard";
import placeholders from "../../data/placeholders";
import Button from "../../components/Button";
import SaveButton from "../../components/SaveButton";
import FlashcardForm from "./FlashcardForm";
import useToggle from "../../hooks/useToggle";
import { MdEdit, MdClose, MdDelete } from "react-icons/md";
import useLog from "../../hooks/useLog";
import LoadingSpinnerLarge from "../../components/LoadingSpinnerLarge";
import { useFetchFlashcards } from "../../hooks/useFetchFlashcards";

const Flashcard = ({
  id,
  flashcard,
  type,
  resetFlashcardContent,
  deleteFlashcard,
  isFlipped,
  setIsFlipped,
}) => {
  const { question, answer, code, category } = flashcard;
  const { setFlashcards } = useFetchFlashcards();
  const { isSaved, setIsSaved, editedFlashcard, setEditedFlashcard } =
    useFlashcards();
  const { user } = useAuth();
  const [isEditing, toggleEditing] = useToggle(false);

  const [flashcardData, setFlashcardData] = useState({
    id,
    question,
    answer,
    category,
    code,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  // Update flashcardData when props change
  useEffect(() => {
    setFlashcardData({
      id,
      question,
      answer,
      category,
      code,
    });
  }, [question, answer, category, code]);

  useEffect(() => {
    // console.log("isEditing is set to:", isEditing);
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
    // console.log("📝 Updating flashcard data:", updatedData);
    setFlashcardData(updatedData);
  };

  const handleSaveSuccess = () => {
    setIsSaved(true);
  };

  useLog(isFlipped, "isflipped from flashcard");
  return (
    <div
      className={classNames("flashcard relative", {
        "flashcard-small": type === "small",
        "flashcard-modal": type === "modal",
        "flashcard-single": type === "single",
      })}
      onClick={() => {
        setIsFlipped((prev) => ({
          ...prev,
          [flashcard.id]: !prev[flashcard.id],
        }));
      }}>
      {isEditing ? (
        <>
          <FlashcardForm
            flashcard={flashcardData}
            toggleEditing={toggleEditing}
            updateFlashcard={updateFlashcardData}
            handleSaveSuccess={handleSaveSuccess}
          />
          <Button
            onClick={() => toggleEditing(false)}
            cssClasses={"absolute top-2 right-2 cursor-pointer"}
            icon={<MdClose className="icon h-6 w-6" />}></Button>
        </>
      ) : (
        // FLASHCARD
        <div className="flashcard-body flex h-full w-full flex-col overflow-scroll">
          <div className="view-mode flex flex-1 flex-col justify-between overflow-auto">
            {!isFlipped ? (
              // FRONT OF FLASHCARD
              <div className="flex h-full flex-col items-center justify-center">
                <p className="question max-w-full text-center text-xl">
                  {flashcardData.question || placeholders.question}
                </p>
              </div>
            ) : (
              // BACK OF FLASHCARD
              <div className="flex h-full flex-col items-center justify-between">
                <div className="flex h-full flex-col items-center justify-center">
                  <p className="answer max-w-full text-center text-xl">
                    {flashcardData.answer || placeholders.answer}
                  </p>
                </div>

                {flashcardData.code &&
                flashcardData.code.trim() !== "// code" ? (
                  <SyntaxHighlighter
                    language="javascript"
                    wrapLongLines={true}
                    style={nightOwl}
                    customStyle={{
                      overflowX: "auto",
                      overflowY: "auto",
                      minHeight: "fit-content",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}>
                    {flashcardData.code}
                  </SyntaxHighlighter>
                ) : (
                  ""
                )}

                {flashcardData.category && showCategories && (
                  <span className="categories text-neutral-500">
                    {flashcardData.category.join(", ")}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="btn-container my-4 flex gap-4">
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
              cssClasses={"btn-primary btn "}
              icon={<MdEdit className="icon-btn" />}
              btntext={"Edit"}
            />

            {/* SAVE */}
            {/* <SaveButton
              onClick={async () => {
                setIsLoading(true);
                const dataToSave = {
                  ...flashcardData,
                  id, // Include the ID from props directly
                };

                console.log("Data being saved with ID:", dataToSave);

                // Save with the ID included
                await saveFlashcard([dataToSave], user);
                setIsLoading(false);
                setIsSaved(true);
              }}
              isSaved={isSaved}
              isLoading={isLoading}
            /> */}
            {/* DELETE */}
            <Button
              onClick={() => deleteFlashcard(id, user)}
              cssClasses={"btn-primary btn "}
              icon={<MdDelete className="icon-btn" />}
              btntext={"Delete"}></Button>
          </div>
          {isLoading && (
            <div className="loading-container">
              <LoadingSpinnerLarge size="7rem" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Flashcard;
