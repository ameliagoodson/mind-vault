import { useState, useEffect, useRef } from "react";
import { handleAPIRequest } from "../api/openAIUtils";
import useToggle from "./useToggle";

export const useChat = () => {
  // ✅ All useState Hooks should be at the top
  const [conversation, setConversation] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
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
    if (question.trim() === "") return;

    const currentQuestion = question.trim();
    setQuestion("");

    const requestId = Date.now().toString();
    responseIdRef.current = requestId;

    setConversation((prev) => [
      ...prev,
      {
        type: "user",
        content: currentQuestion,
        timestamp: new Date().toISOString(),
      },
    ]);

    handleAPIRequest(
      currentQuestion,
      setAnswer,
      setCategory,
      setCode,
      setResetFlashcardContent,
      conversation,
      (answerText) => {
        if (responseIdRef.current === requestId) {
          setAnswer(answerText);
          setConversation((prev) => [
            ...prev,
            {
              type: "ai",
              content: answerText,
              category,
              code,
              timestamp: new Date().toISOString(),
            },
          ]);
        }
      },
    );
  };

  return {
    conversation,
    question,
    setQuestion,
    answer,
    category,
    code,
    resetFlashcardContent,
    handleSubmit,
    setConversation,
    selectedFlashcard,
    setSelectedFlashcard,
  };
};
