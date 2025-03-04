import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { handleAPIRequest } from "../../api/openAIUtils";
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  dracula,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";

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
          timestamp: new Date().toISOString(),
        },
        {
          type: "ai",
          content: response,
          example: example,
          timestamp: new Date().toISOString(),
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
    <div className="chat-interface mb-4 flex flex-1 flex-col overflow-auto rounded-md bg-white p-4">
      <div className="chat-conversation flex-1 overflow-auto">
        {conversation.length === 0 ? (
          <div className="py-4 text-center text-gray-400 italic">
            Your conversation will appear here
          </div>
        ) : (
          conversation.map((element, index) =>
            element.type == "user" ? (
              <div key={index} className="chat-message chat-user block">
                {element.content}
              </div>
            ) : (
              <div key={index}>
                <div className="chat-message chat-ai block">
                  {element.content}
                </div>
                {element.example && (
                  <div className="mt-2 mb-4">
                    <SyntaxHighlighter
                      language="javascript"
                      style={vscDarkPlus}
                      showLineNumbers
                      wrapLongLines>
                      {element.example}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            ),
          )
        )}
      </div>
      <div className="chat-input">
        <textarea
          placeholder="Ask GPT a question"
          onChange={(event) => setQuery(event.target.value)}
          value={query}
          className="w-full border-t border-gray-300"></textarea>
        <Button
          onClick={() => {
            console.log("Before API call - query:", query);
            console.log("Before API call - conversation:", conversation);

            handleAPIRequest(
              query,
              conversation,
              setResponse,
              setCategory,
              setExample,
              setResetFlashcardContent,
            );
            setQuery(""); // the added clear on submit that messed up everything
          }}
          btntext="Submit"
          cssClasses="btn-primary"
        />
        <Button
          onClick={() => {
            setConversation([]);
            setQuery("");
          }}
          btntext={"Clear"}
          cssClasses={"btn-primary"}></Button>
      </div>
    </div>
  );
};

export default ChatComponent;
