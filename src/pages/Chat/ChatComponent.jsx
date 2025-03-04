import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { handleAPIRequest } from "../../api/openAIUtils";
import { useState, useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MdAccountCircle, MdContentCopy } from "react-icons/md";

const ChatComponent = () => {
  const { user } = useAuth();
  const [conversation, setConversation] = useState([]);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [category, setCategory] = useState("");
  const [example, setExample] = useState("");
  const [resetFlashcardContent, setResetFlashcardContent] = useState();
  const responseIdRef = useRef(null); // Track the last response we've processed

  // Load conversation from localStorage on initial render
  useEffect(() => {
    const data = localStorage.getItem("CONVERSATION");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setConversation(parsed);
      } catch (e) {
        console.error("Error parsing conversation from localStorage", e);
      }
    }
  }, []);

  // Save conversation to localStorage when it changes
  useEffect(() => {
    if (conversation.length > 0) {
      localStorage.setItem("CONVERSATION", JSON.stringify(conversation));
    }
  }, [conversation]);

  // This function handles the API request and manages conversation updates
  const handleSubmit = () => {
    if (query.trim() === "") return; // Don't process empty queries

    const currentQuery = query.trim(); // Save the current query
    setQuery(""); // Clear input field immediately for better UX

    // Generate a unique ID for this response
    const requestId = Date.now().toString();
    responseIdRef.current = requestId;

    // Add user message to conversation immediately
    setConversation((prev) => [
      ...prev,
      {
        type: "user",
        content: currentQuery,
        timestamp: new Date().toISOString(),
      },
    ]);

    // Call API
    handleAPIRequest(
      currentQuery,
      conversation,
      (responseText) => {
        // Only update if this is still the latest request
        if (responseIdRef.current === requestId) {
          setResponse(responseText);

          // Add AI response to conversation
          setConversation((prev) => [
            ...prev,
            {
              type: "ai",
              content: responseText,
              example: example,
              timestamp: new Date().toISOString(),
            },
          ]);
        }
      },
      setCategory,
      setExample,
      setResetFlashcardContent,
    );
  };

  return (
    <div className="chat-interface flex flex-1 flex-col overflow-auto rounded-md bg-white">
      <div className="chat-conversation flex-1 overflow-auto p-4">
        {conversation.length === 0 ? (
          <div className="py-4 text-center text-gray-400 italic">
            Your conversation will appear here
          </div>
        ) : (
          conversation.map((element, index) =>
            element.type == "user" ? (
              <div key={index} className="chat-message chat-user block">
                <span>
                  <MdAccountCircle className="mr-1 inline h-6 w-6" />
                  {element.content}
                </span>
              </div>
            ) : (
              <div key={index}>
                <div className="chat-message chat-ai block">
                  {element.content}
                </div>
                {element.example && (
                  <div className="relative mt-2">
                    <SyntaxHighlighter
                      language="javascript"
                      style={vscDarkPlus}
                      showLineNumbers
                      wrapLongLines>
                      {element.example}
                    </SyntaxHighlighter>
                  </div>
                )}
                <div className="btn-container mb-4 flex justify-end">
                  <button className="btn btn-small btn-no-colour mt-0 mr-4">
                    Convert to Flashcard
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        element.content + "\n" + element.example,
                      );
                    }}>
                    <MdContentCopy className="h-5 w-5 text-black" />
                  </button>
                </div>
              </div>
            ),
          )
        )}
      </div>
      <div className="chat-input mt-2 p-4">
        <textarea
          placeholder="Ask GPT a question"
          onChange={(event) => setQuery(event.target.value)}
          value={query}
          className="w-full border-t border-gray-300"></textarea>
        <div className="btn-container flex">
          <Button
            onClick={handleSubmit}
            btntext={"Submit"}
            cssClasses={"btn btn-primary mr-2"}
          />
          <Button
            onClick={() => {
              setConversation([]);
              setQuery("");
              localStorage.removeItem("CONVERSATION");
            }}
            btntext={"Clear"}
            cssClasses={"btn btn-secondary"}></Button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
