

// SAVE function uses local variables to determine final values
const saveFlashcard = (query, response, category, user) => {
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