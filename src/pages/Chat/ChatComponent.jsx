import { useChat } from "../../hooks/useChat";
import Button from "../../components/Button";
import { MdAccountCircle, MdContentCopy } from "react-icons/md";
import FlashcardModal from "../Flashcards/FlashcardModal";
import useToggle from "../../hooks/useToggle";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatComponent = () => {
  const {
    conversation,
    question,
    setQuestion,
    handleSubmit,
    selectedFlashcard,
    setSelectedFlashcard,
  } = useChat();

  const [isModalOpen, toggleModal] = useToggle(false);

  const openFlashcardModal = (index) => {
    const aiMessage = conversation[index];

    if (!aiMessage) {
      console.error("❌ Error: AI message not found at index", index);
      return;
    }

    const question =
      conversation
        .slice(0, index) // Look at earlier messages
        .reverse()
        .find((msg) => msg.type === "user")?.content || "";

    setSelectedFlashcard({
      code: aiMessage.code || "",
      answer: aiMessage.content || "",
      category: aiMessage.category || "",
      question: question,
    });

    toggleModal();
  };

  return (
    <div className="chat-interface flex h-full flex-1 flex-col rounded-md bg-white">
      <div className="chat-conversation flex-1 overflow-auto p-4">
        {conversation.length === 0 ? (
          <div className="py-4 text-center text-gray-400 italic">
            Your conversation will appear here
          </div>
        ) : (
          conversation.map((element, index) =>
            element.type === "user" ? (
              <div key={index} className="chat-message chat-user block">
                <p className="leading-7">
                  <MdAccountCircle className="mr-1 inline h-6 w-6" />
                  {element.content}
                </p>
              </div>
            ) : (
              <div key={index}>
                <div className="chat-message chat-ai block">
                  <p className="leading-7">{element.content}</p>
                </div>
                {element.code && (
                  <div className="relative mt-2">
                    <SyntaxHighlighter style={nightOwl} language="javascript">
                      {element.code}
                    </SyntaxHighlighter>
                  </div>
                )}
                <div className="btn-container mb-4 flex justify-end">
                  <button
                    onClick={() => openFlashcardModal(index)}
                    className="btn btn-small btn-no-colour mt-0 mr-4">
                    Convert to Flashcard
                  </button>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        element.content + "\n" + element.code,
                      )
                    }>
                    <MdContentCopy className="icon" />
                  </button>
                </div>
              </div>
            ),
          )
        )}
      </div>
      {/* // */}
      <div className="chat-input -0 mt-2 flex-shrink-0 p-4">
        <textarea
          placeholder="Ask GPT a question"
          onChange={(event) => setQuestion(event.target.value)}
          value={question}
          className="w-full border-t border-gray-300"></textarea>
        <div className="btn-container flex">
          <Button
            onClick={handleSubmit}
            btntext={"Submit"}
            cssClasses={"btn btn-primary mr-2"}
          />
          <Button
            onClick={() => localStorage.removeItem("CONVERSATION")}
            btntext={"Clear"}
            cssClasses={"btn btn-secondary"}
          />
        </div>
      </div>
      {isModalOpen && selectedFlashcard && (
        <FlashcardModal
          code={selectedFlashcard.code}
          answer={selectedFlashcard.answer}
          category={selectedFlashcard.category}
          question={selectedFlashcard.question}
          toggleModal={toggleModal}
          isModalOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default ChatComponent;
