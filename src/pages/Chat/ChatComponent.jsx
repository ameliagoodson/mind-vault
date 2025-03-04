import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { handleAPIRequest } from "../../api/openAIUtils";
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";


const ChatComponent = () => {
  const { user } = useAuth();
  const [conversation, setConversation] = useState([]);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [category, setCategory] = useState("");
  const [example, setExample] = useState("");
  const [resetFlashcardContent, setResetFlashcardContent] = useState();

  useEffect(() => {
    if (query.trim() !== "" && response.trim() !== "") {
      setConversation((prev) => [
        ...prev,
        {
          type: "user",
          content: query,
          timestamp: new Date().toISOString()
        }, {
          type: "ai",
          content: response,
          example: example,
          timestamp: new Date().toISOString()
        },
      ]);
    }
  }, [response]);

  useEffect(() => {
    const data = localStorage.getItem("CONVERSATION");
    if (data) {
      const parsed = JSON.parse(data);
      setConversation(parsed);
    }
  }, []);


  useEffect(() => {
    if (conversation.length > 0) {
      localStorage.setItem("CONVERSATION", JSON.stringify(conversation));
    }
  }, [conversation]);



  return (
    <div className="chat-interface flex-1 flex flex-col mb-4 rounded-md bg-white p-4 overflow-auto">
      <div className="chat-conversation flex-1 overflow-auto">
        {conversation.length === 0 ? (
          <div className="text-gray-400 italic py-4 text-center">Your conversation will appear here</div>
        ) : (
          conversation.map((element, index) =>
            element.type == "user" ? (
              <div key={index} className="block chat-message chat-user">
                {element.content}
              </div>
            ) : (
              <div key={index}>
                <div className="block chat-message chat-ai">
                  {element.content}
                </div>
                {element.example && (
                  <div className="mt-2 mb-4">
                    <SyntaxHighlighter language="javascript" style={vscDarkPlus} showLineNumbers wrapLongLines>
                      {element.example}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            )
          )
        )}
      </div>
      <div className="chat-input">
        <textarea
          placeholder="Ask GPT a question"
          onChange={(event) => setQuery(event.target.value)}
          className="w-full border-t border-gray-300">
        </textarea>
        <Button
          onClick={() => {
            handleAPIRequest(
              query,
              setResponse,
              setCategory,
              setExample,
              setResetFlashcardContent,
            );
          }}
          btntext="Submit"
          cssClasses="btn-primary">
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;