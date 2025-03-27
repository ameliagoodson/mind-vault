import { useChat } from "../../hooks/useChat";
import Button from "../../components/Button";
import { MdAccountCircle, MdContentCopy } from "react-icons/md";
import FlashcardModal from "../Flashcards/FlashcardModal";
import useToggle from "../../hooks/useToggle";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import LoadingSpinnerLarge from "../../components/LoadingSpinnerLarge";

const ChatComponent = () => {
  const {
    conversation,
    question,
    setQuestion,
    handleReset,
    handleSubmit,
    isLoading,
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
        .slice(0, index)
        .reverse()
        .find((msg) => msg.type === "user")?.content || "";

    setSelectedFlashcard({
      code: aiMessage.code || "",
      answer: aiMessage.content || "",
      category: aiMessage.category || "",
      question: question,
    });

    toggleModal(true);
  };

  return (
    <div className="chat-interface flex h-full flex-1 flex-col rounded-md bg-white">
      <div className="chat-conversation flex-1 overflow-auto">
        {conversation.length === 0 ? (
          <div className="py-4 text-center text-gray-400 italic">
            Your conversation will appear here
          </div>
        ) : (
          conversation.map((element, index) =>
            element.type === "user" ? (
              <div
                key={index}
                className="chat-message chat-user mb-4 rounded-lg p-3">
                <p className="leading-7">
                  <MdAccountCircle className="mr-1 inline h-6 w-6" />
                  {element.content}
                </p>
              </div>
            ) : (
              <div
                key={index}
                className="chat-message chat-ai mb-4 rounded-lg bg-purple-50 p-3">
                <div>
                  <p className="leading-7">{element.content}</p>
                </div>
                {element.code && (
                  <div className="relative mt-2">
                    <SyntaxHighlighter style={nightOwl} language="javascript">
                      {element.code}
                    </SyntaxHighlighter>
                  </div>
                )}
                <div className="btn-container mt-2 flex justify-end">
                  <Button
                    onClick={() => openFlashcardModal(index)}
                    cssClasses="btn btn-small btn-no-colour mt-0 mr-4"
                    btntext={"Convert to Flashcard"}></Button>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        element.content +
                          (element.code ? "\n\n" + element.code : ""),
                      )
                    }>
                    <MdContentCopy className="icon cursor-pointer" />
                  </button>
                </div>
              </div>
            ),
          )
        )}
        {isLoading && (
          <div className="chat-message chat-ai mb-4 rounded-lg bg-purple-50 p-3">
            <LoadingSpinnerLarge />
          </div>
        )}
      </div>

      <div className="chat-input -0 mt-2 flex-shrink-0 p-4">
        <textarea
          placeholder="Ask GPT a question"
          onChange={(event) => setQuestion(event.target.value)}
          value={question}
          className="w-full rounded border-t border-gray-300 p-2"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}></textarea>
        <div className="btn-container mt-2 flex">
          <Button
            onClick={handleSubmit}
            btntext={isLoading ? "SENDING..." : "SUBMIT"}
            cssClasses={`btn btn-primary mr-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          />
          <Button
            onClick={handleReset}
            btntext={"CLEAR"}
            cssClasses={"btn btn-secondary"}
            disabled={isLoading}
          />
        </div>
      </div>

      {isModalOpen && selectedFlashcard && (
        <FlashcardModal
          flashcard={{
            code: selectedFlashcard.code,
            answer: selectedFlashcard.answer,
            category: selectedFlashcard.category,
            question: selectedFlashcard.question,
          }}
          toggleModal={toggleModal}
          isModalOpen={isModalOpen}
          type={"modal"}
        />
      )}
    </div>
  );
};

export default ChatComponent;
