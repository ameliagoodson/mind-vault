import processCategories from "../../utils/processCategories";
import placeholders from "../../data/placeholders";
import { saveToDB } from "../../firestore";

// SAVE function uses local variables to determine final values
const saveFlashcard = ({
  question,
  answer,
  category,
  user,
  code,
  editedQuestion,
  editedAnswer,
  editedCategories,
}) => {
  // Calculate what should be saved
  const questionToSave =
    editedQuestion === "" || editedQuestion === placeholders.question
      ? question
      : editedQuestion;

  const answerToSave =
    answer === "" || answer === placeholders.answer ? answer : editedAnswer;

  const categoryToUse =
    editedCategories === "" || editedCategories === placeholders.category
      ? category
      : editedCategories;

  // Process categories
  const processedCategories = processCategories(categoryToUse);
  if (!user || !user.uid) {
    console.error("❌ User not authenticated or missing UID:", user);
    return;
  }
  // Save to database
  saveToDB({
    user: user,
    question: questionToSave,
    answer: answerToSave,
    category: processedCategories,
    code: code,
  });
  return {
    question: questionToSave,
    answer: answerToSave,
    categories: processedCategories,
    isSaved: true,
  };
};
export default saveFlashcard;
