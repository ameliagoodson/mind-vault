import { doc, where, getDocs, query, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import Flashcard from "./Flashcard";

const getAllFlashcards = () => {
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const getFlashcards = async () => {
      const query = collection(db, "users", user.uid, "flashcards");
      const queryResponse = await getDocs(query);

      const flashcardsArray = [];

      queryResponse.forEach((doc) => {
        flashcardsArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setFlashcards(flashcardsArray);
      console.log(flashcardsArray);
    };

    getFlashcards();
  }, [user]);

  return (
    <div>
      <h1>Display all Flashcards</h1>
      {flashcards.map((card) => (
        <div key={card.id}>
          <Flashcard
            query={card.question}
            response={card.answer}
            category={card.category}
            example={card.example}
          />
        </div>
      ))}
    </div>
  );
};

export default getAllFlashcards;
