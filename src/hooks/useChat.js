import { useState, useEffect, useRef } from "react";
import { handleAPIRequest } from "../api/openAIUtils";
import useToggle from "./useToggle";

export const useChat = () => {
  // ✅ All useState Hooks should be at the top
  const [conversation, setConversation] = useState([]);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [category, setCategory] = useState("hello");
  const [code, setCode] = useState("");
  const [resetFlashcardContent, setResetFlashcardContent] = useState(false);
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);

  // ✅ Then useRef Hooks
  const responseIdRef = useRef(null);

  // ✅ Then useEffect Hooks
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

  useEffect(() => {
    if (conversation.length > 0) {
      localStorage.setItem("CONVERSATION", JSON.stringify(conversation));
    }
  }, [conversation]);

  const handleSubmit = () => {
    if (query.trim() === "") return;

    const currentQuery = query.trim();
    setQuery("");

    const requestId = Date.now().toString();
    responseIdRef.current = requestId;

    setConversation((prev) => [
      ...prev,
      {
        type: "user",
        content: currentQuery,
        timestamp: new Date().toISOString(),
      },
    ]);

    handleAPIRequest(
      currentQuery,
      conversation,
      (responseText) => {
        if (responseIdRef.current === requestId) {
          setResponse(responseText);
          setConversation((prev) => [
            ...prev,
            {
              type: "ai",
              content: responseText,
              category,
              code,
              timestamp: new Date().toISOString(),
            },
          ]);
        }
      },
      setCategory,
      setCode,
      setResetFlashcardContent,
    );
  };

  return {
    conversation,
    query,
    setQuery,
    response,
    category,
    code,
    resetFlashcardContent,
    handleSubmit,
    setConversation,
    selectedFlashcard,
    setSelectedFlashcard,
  };
};
