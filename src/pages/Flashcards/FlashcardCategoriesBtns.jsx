import { useFetchFlashcards } from "../../hooks/useFetchFlashcards";
import Button from "../../components/Button";
import { Link, useParams } from "react-router";

const FlashcardCategoriesBtns = ({ basePath = "/flashcards" }) => {
  const { categoriesList } = useFetchFlashcards();
  const { category } = useParams();

  return (
    <div className="flashcard-categories flex gap-4">
      <Button
        btntext={"All"}
        to={`${basePath}`}
        cssClasses={`btn ${!category ? "btn-active" : "btn-primary"}`}></Button>
      {categoriesList.map((cat, index) => (
        <Button
          key={index}
          btntext={cat}
          cssClasses={`btn ${cat === category ? "btn-active" : "btn-primary"}`}
          to={`${basePath}/${cat}`}
        />
      ))}
    </div>
  );
};

const FlashcardCategoriesBtnsBlock = ({ basePath = "/study" }) => {
  const { flashcards, categoriesList } = useFetchFlashcards();
  // Debugging: Check for undefined categories
  flashcards.forEach((flashcard, index) => {
    if (!flashcard.category) {
      console.warn(
        `⚠️ Flashcard at index ${index} has an undefined category:`,
        flashcard,
      );
    }
  });
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
      {/* "All Flashcards" Button */}
      <Link
        to={`${basePath}`}
        className="block rounded-lg bg-gray-500 py-4 text-center text-lg font-semibold text-white shadow-md transition hover:bg-gray-600">
        All Flashcards <br />
        <span className="text-sm font-normal">({flashcards.length} cards)</span>
      </Link>
      {/* Category Buttons */}
      {categoriesList.length > 0 &&
        categoriesList.map(
          (cat) =>
            cat && (
              <Link
                key={cat}
                to={`${basePath}/${cat}`}
                className="block rounded-lg bg-purple-500 py-4 text-center text-lg font-semibold text-white shadow-md transition hover:bg-purple-600">
                {cat} <br />
                <span className="text-sm font-normal">
                  (
                  {
                    flashcards.filter(
                      (flashcard) =>
                        Array.isArray(flashcard.category) &&
                        flashcard.category.includes(cat),
                    ).length
                  }{" "}
                  cards)
                </span>
              </Link>
            ),
        )}
    </div>
  );
};

export { FlashcardCategoriesBtns, FlashcardCategoriesBtnsBlock };
