import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { handleAPIRequest } from "../../utils/openAIUtils";
import { useState, useEffect } from "react";

const ChatComponent = () => {
  const { user } = useAuth();
  const [conversation, setConversation] = useState([]);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [category, setCategory] = useState("");
  const [example, setExample] = useState("");
  const [resetFlashcardContent, setResetFlashcardContent] = useState();

  useEffect(() => {
    setConversation((prev) => [
      ...prev,
      {
        type: "user",
        content: query,
        timestamp: new Date().toISOString()
      }, {
        type: "ai",
        content: response,
        timestamp: new Date().toISOString()
      },
    ]);
  }, [response]);

  // useEffect(() => {
  //   console.log(conversation);
  // }, [conversation])

  // useEffect(() => {
  //   setConversation(prev => [...prev, response])
  // }, [response])

  return (

    <div className="chat-interface mb-4 w-full h-full rounded-md border-1 bg-white p-4">
      <div className="chat-conversation">
        {conversation.map((element) =>
          element.type == "user" ? (

            <div key={element.timestamp} className="block chat-message chat-user">
              {element.content}
            </div>
          ) :
            <div key={element.timestamp} className="block chat-message chat-ai">
              {element.content}
            </div>)}
      </div>
      <div className="chat-input">
        <textarea
          placeholder="Ask GPT a question"
          onChange={(event) => setQuery(event.target.value)}></textarea>
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
          cssClasses="btn-primary"></Button>
      </div>
    </div>
  );
};

export default ChatComponent;
