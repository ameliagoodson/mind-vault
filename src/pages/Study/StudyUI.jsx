import Flashcard from "../Flashcards/Flashcard";
import FlashcardNavigation from "../Flashcards/FlashcardNavigation";

const StudyUI = () => {
  return (
    <div className="container mx-auto max-w-5xl bg-gray-50 p-4">
      <h1 className="text-center">Category tag</h1>
      <Flashcard />
      <FlashcardNavigation />
    </div>
  );
};
export default StudyUI;
