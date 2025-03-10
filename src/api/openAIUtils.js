import { callOpenAI } from "./callOpenAI";

export const handleAPIRequest = async (
  question,
  setAnswer,
  setCategory,
  setCode,
  setResetFlashcardContent,
  conversation = null,
) => {
  if (conversation) {
    try {
      const apiAnswer = await callOpenAI(question, conversation);

      setAnswer(apiAnswer.answer || "Error: No response"); // Prevent setting undefined
      setCategory(apiAnswer.categories || "Unknown");
      setCode(apiAnswer.example || "");
      setResetFlashcardContent(false);
    } catch (error) {
      console.log("Error " + error);
    }
  } else {
    try {
      const apiAnswer = await callOpenAI(question);

      setAnswer(apiAnswer.answer || "Error: No response"); // Prevent setting undefined
      setCategory(apiAnswer.categories || "Unknown");
      setCode(apiAnswer.example || "");
      setResetFlashcardContent(false);
    } catch (error) {
      console.log("Error " + error);
    }
  }
};
