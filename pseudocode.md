<!-- SAVE SINGLE VS SAVE MULTIPLE FLASHCARDS -->

1. Conditionally render the save button inside `FlashcardForm`

   - Do not show it when used inside `ManualFlashcardCreator`.
   - Keep the "Save All" button inside `ManualFlashcardCreator`.

2. Create state for an array of flashcards inside `ManualFlashcardCreator`.

   - This array stores multiple flashcards.
   - Each flashcard is an object: `{ question, answer, categories, code }`.

3. Modify `FlashcardForm` to be flexible:

   - If `cardData` and `onChange` props are provided, use them.
   - If no props are given (e.g., for AI flashcards), use local state.

4. Handle updates in `ManualFlashcardCreator`:

   - Pass `updateFlashcard(index, field, value)` to `FlashcardForm`.
   - When a user types, `FlashcardForm` calls `updateFlashcard` instead of updating its own state.

5. Modify the `handleSaveFlashcards` function:

   - Always expect an array of flashcards.
   - Pass this array along with `user` to `saveToDB`.

6. Modify the save function in `FlashcardForm`:
   - It should **either** update `ManualFlashcardCreator` (when applicable)  
     **or** store its own flashcard and send it as an array to `saveToDB`.
