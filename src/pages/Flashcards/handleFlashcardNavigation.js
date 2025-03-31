export const handleNavigation = ({
  navigation,
  filteredFlashcards,
  currentCard,
  setCurrentCard,
  setIsDisabled,
  finalCard,
  setIsFinished,
}) => {
  const length = filteredFlashcards.length;
  const cardIndex = currentCard;
  console.log("pressed: ", navigation);

  if (navigation === "prev" && length > 1) {
    const newCardIndex = cardIndex - 1;
    setCurrentCard(newCardIndex);
  } else if (navigation === "next" && cardIndex < length - 1) {
    const newCardIndex = cardIndex + 1;
    setCurrentCard(newCardIndex);
  } else if (finalCard && navigation === "next") {
    setIsFinished(true);
  }
};
