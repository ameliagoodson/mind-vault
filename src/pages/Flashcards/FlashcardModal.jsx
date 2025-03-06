import Flashcard from "./Flashcard";
import { MdClose } from "react-icons/md";

const FlashcardModal = ({
  question,
  answer,
  category,
  code,
  isOpen,
  setIsOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => setIsOpen(false)}>
      <div
        className="modal-container relative z-10 max-w-2xl rounded-lg bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}>
        <Flashcard
          query={question}
          response={answer}
          category={category}
          code={code}
          type="modal"
        />
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2">
          <MdClose className="icon h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default FlashcardModal;
