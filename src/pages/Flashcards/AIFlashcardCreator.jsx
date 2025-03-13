import ChatComponent from "../Chat/ChatComponent";
import Flashcard from "./Flashcard";

// AIFlashcardCreator
const AIFlashcardCreator = () => {
  return (
    <div className="aiflashcardcreator container mx-auto flex h-[80vh] max-w-4xl flex-col">
      <div className="h-[65vh] flex-1 overflow-auto">
        <ChatComponent />
      </div>
      <div className="mt-4 h-[15vh] flex-shrink-0">
        <h1>Some text</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur hic
        assumenda totam harum facilis ratione, at impedit dicta vero, nostrum
        cumque rerum voluptatum veniam amet repellat omnis sed magnam excepturi!
      </div>
    </div>
  );
};

export default AIFlashcardCreator;
