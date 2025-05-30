import Flashcard from "./Flashcard";
import { MdClose } from "react-icons/md";
import Button from "../../components/Button";

const FlashcardModal = ({ flashcard, isModalOpen, toggleModal }) => {
  if (!isModalOpen) return null;

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => toggleModal()}>
      <div
        className="modal-container relative z-10 max-w-3xl rounded-lg bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}>
        <Flashcard flashcard={flashcard} type="modal" />
        <Button
          onClick={() => toggleModal()}
          cssClasses={"absolute top-2 right-2"}
          icon={
            <MdClose className="icon h-6 w-6 hover:cursor-pointer" />
          }></Button>
      </div>
    </div>
  );
};

export default FlashcardModal;
