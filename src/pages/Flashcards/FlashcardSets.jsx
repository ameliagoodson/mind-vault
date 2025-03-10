import { doc, where, getDocs, query, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import useFlashcards from "./useFlashcards";

const GetAllFlashcards = () => {
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState([]);

  console.log("PASSING SETFLASHCARDS TO HOOK:", setFlashcards); // Debugging

  // ✅ Fix: Pass setFlashcards when calling useFlashcards
  const { deleteFlashcard } = useFlashcards(setFlashcards);

  useEffect(() => {
    if (!user) return; // Prevent errors if user is null

    const getFlashcards = async () => {
      const querySnapshot = await getDocs(
        collection(db, "users", user.uid, "flashcards"),
      );

      const flashcardsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("SET FLASHCARDS:", flashcardsArray); // Debugging
      setFlashcards(flashcardsArray);
    };

    getFlashcards();
  }, [user]);

  return (
    <div>
      <h1>Display all Flashcards</h1>
      {flashcards.map((card) => (
        <Flashcard
          key={card.id}
          id={card.id}
          question={card.question}
          answer={card.answer}
          category={card.category}
          code={card.code}
          deleteFlashcard={deleteFlashcard} // ✅ Pass delete function properly
        />
      ))}
    </div>
  );
};

export default GetAllFlashcards;
