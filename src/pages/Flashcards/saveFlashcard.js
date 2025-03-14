import { saveToDB } from "../../firestore";

// SAVE function uses local variables to determine final values
const saveFlashcard = (flashcards, user) => {
  console.log("flashcards:", flashcards);
  console.log("user", user);
  if (!user || !user.uid) {
    console.error("❌ User not authenticated or missing UID:", user);
    return;
  }

  flashcards.forEach(({ question, answer, category, code }) => {
    saveToDB({
      user,
      question,
      answer,
      category,
      code,
    });
  });
};
export default saveFlashcard;
