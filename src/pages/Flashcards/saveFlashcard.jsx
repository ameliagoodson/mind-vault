import processCategories from "../../utils/processCategories";
import placeholders from "../../data/placeholders";
import { saveToDB } from "../../firestore";

// SAVE function uses local variables to determine final values
const saveFlashcard = (query, answer, category, user, editedQuestion, editedAnswer, editedCategories) => {
  // Calculate what should be saved
  const questionToSave =
    editedQuestion === "" || editedQuestion === placeholders.question
      ? query
      : editedQuestion;

  const answerToSave =
    answer === "" || answer === placeholders.answer
      ? response
      : editedAnswer;

  const categoryToUse =
    editedCategories === "" || editedCategories === placeholders.category
      ? category
      : editedCategories;

  // Process categories
  const processedCategories = processCategories(categoryToUse)

  // Save to database
  saveToDB({
    user: user,
    question: questionToSave,
    answer: answerToSave,
    category: processedCategories,
  });
  return {
    question: questionToSave,
    answer: answerToSave,
    categories: processedCategories,
    isSaved: true,
  };
};
export default saveFlashcard