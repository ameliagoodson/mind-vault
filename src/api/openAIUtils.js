import { callOpenAI } from "./callOpenAI";

export const handleAPIRequest = async (
  query,
  conversation,
  setResponse,
  setCategory,
  setExample,
  setResetFlashcardContent,
) => {
  try {
    const apiResponse = await callOpenAI(query, conversation);
    setResponse(apiResponse.response || "Error: No response"); // Prevent setting undefined
    setCategory(apiResponse.categories || "Unknown");
    setExample(apiResponse.example || "");
    setResetFlashcardContent(false);
  } catch (error) {
    console.log("Error " + error);
  }
};
