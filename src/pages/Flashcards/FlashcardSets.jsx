import { doc, where, getDocs, query, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import useFlashcards from "./useFlashcards";
import useToggle from "../../hooks/useToggle";
import Loading from "../../components/Loading";

const GetAllFlashcards = () => {
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState([]);
  const [loading, toggleLoading] = useToggle(true);

  // ✅ Fix: Pass setFlashcards when calling useFlashcards
  const { deleteFlashcard } = useFlashcards(setFlashcards);

  useEffect(() => {
    if (!user) return;

    const getFlashcards = async () => {
      const querySnapshot = await getDocs(
        collection(db, "users", user.uid, "flashcards"),
      );

      const flashcardsArray = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        console.log("Fetched flashcard doc ID:", doc.id);
        console.log("Fetched flashcard data:", data);
        return {
          id: doc.id,
          ...data,
        };
      });
      setFlashcards(flashcardsArray);
      toggleLoading(false);
    };

    getFlashcards();
  }, [user]);

  return (
    <div className="container mx-auto flex h-full max-w-7xl flex-col">
      {loading && <Loading />}
      <h1>Display all Flashcards</h1>
      <div className="flashcards-container grid grid-cols-2 gap-4">
        {flashcards.map((card) => {
          console.log("Rendering flashcard with ID:", card.id);
          return (
            <Flashcard
              key={card.id}
              id={card.id}
              flashcard={card}
              deleteFlashcard={deleteFlashcard}
              type={"small"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GetAllFlashcards;
