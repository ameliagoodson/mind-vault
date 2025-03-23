import ChatComponent from "../Chat/ChatComponent";
import Flashcard from "./Flashcard";

// AIFlashcardCreator
const AIFlashcardCreator = () => {
  return (
    <div className="aiflashcardcreator container mx-auto flex h-[80vh] max-w-4xl flex-col">
      <div className="h-full flex-1 overflow-auto">
        <ChatComponent />
      </div>
    </div>
  );
};

export default AIFlashcardCreator;
