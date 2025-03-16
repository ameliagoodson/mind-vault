import { useState, useEffect, useRef } from "react";
import { callOpenAI, resetTokenCounter } from "../api/callOpenAI";
import useToggle from "./useToggle";

export const useChat = () => {
  // State Hooks
  const [conversation, setConversation] = useState([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);
  const [resetFlashcardContent, setResetFlashcardContent] = useState(false);

  // Load conversation from localStorage on mount
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

  // Save conversation to localStorage whenever it updates
  useEffect(() => {
    if (conversation.length > 0) {
      localStorage.setItem("CONVERSATION", JSON.stringify(conversation));
    }

    // Debug logging (using console.log instead of useLog hook)
    console.log("Current conversation:", conversation);
  }, [conversation]);

  // Clear conversation and localStorage
  const handleReset = () => {
    setQuestion("");
    setSelectedFlashcard(null);
    setResetFlashcardContent(true);
    setConversation([]); // Clear the conversation
    localStorage.removeItem("CONVERSATION");

    // Reset the token counter
    resetTokenCounter();

    console.log("✅ Conversation cleared");
  };

  const handleSubmit = async () => {
    if (isLoading || question.trim() === "") return;

    const currentQuestion = question.trim();
    setQuestion(""); // Clear input right away
    setIsLoading(true);

    // Add user message to conversation
    const userMessage = {
      type: "user",
      content: currentQuestion,
      timestamp: new Date().toISOString(),
    };

    // Update conversation with user message
    setConversation((prevConversation) => {
      const updatedConversation = [...prevConversation, userMessage];
      return updatedConversation;
    });

    try {
      // Prepare the conversation messages for API
      const conversationForAPI = [...conversation, userMessage];

      // Call API
      console.log("Sending to API:", conversationForAPI);
      const response = await callOpenAI(currentQuestion, conversationForAPI);

      // Debug logged, helping you verify the response
      console.log("API Response received:", response);

      // Create AI message
      const aiMessage = {
        type: "ai",
        content: response.answer || "No response from AI",
        category: response.categories || [],
        code: response.example || "",
        timestamp: new Date().toISOString(),
      };

      // Update conversation with AI response
      setConversation((prevConversation) => {
        return [...prevConversation, aiMessage];
      });

      // Reset flashcard content flag
      setResetFlashcardContent(false);
    } catch (error) {
      console.error("Error in API call:", error);

      // Add error message to conversation
      setConversation((prevConversation) => {
        return [
          ...prevConversation,
          {
            type: "ai",
            content: "Sorry, there was an error processing your request.",
            timestamp: new Date().toISOString(),
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    conversation,
    question,
    setQuestion,
    isLoading,
    resetFlashcardContent,
    handleSubmit,
    handleReset,
    selectedFlashcard,
    setSelectedFlashcard,
  };
};
