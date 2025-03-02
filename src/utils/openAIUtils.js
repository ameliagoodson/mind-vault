import { callOpenAI } from "../api/CallOpenAI";

export const handleAPIRequest = async (query, setResponse, setCategory, setExample, setResetFlashcardContent) => {
  try {
    const apiResponse = await callOpenAI(query);
    setResponse(apiResponse.response || "Error: No response"); // Prevent setting undefined
    setCategory(apiResponse.categories || "Unknown");
    setExample(apiResponse.example || "No example");
    setResetFlashcardContent(false);
  } catch (error) {
    console.log("Error " + error);
  }
};
