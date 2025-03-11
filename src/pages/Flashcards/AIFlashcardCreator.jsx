import ChatComponent from "../Chat/ChatComponent";
import Flashcard from "./Flashcard";

// AIFlashcardCreator
const AIFlashcardCreator = () => {
  return (
    <div className="container mx-auto flex h-full max-w-4xl flex-col">
      <div className="min-h-0 flex-1 overflow-hidden">
        <ChatComponent />
      </div>
      <div className="mt-4 flex-shrink-0">
        <h1>Some text</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur hic
        assumenda totam harum facilis ratione, at impedit dicta vero, nostrum
        cumque rerum voluptatum veniam amet repellat omnis sed magnam excepturi!
      </div>
    </div>
  );
};

export default AIFlashcardCreator;
