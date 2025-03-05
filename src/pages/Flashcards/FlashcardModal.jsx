import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import useFlashcards from "./useFlashcards";
import Flashcard from "./Flashcard";

// const FlashcardModal = ({ question, answer, code, onClose }) => {
//   return (
//     <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
//       <div className="relative w-2/3 max-w-lg rounded-lg bg-white p-6 shadow-lg">
//         {/* ✅ Close Button - Positioned in Top Right */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 rounded-lg bg-purple-600 px-4 py-2 text-white">
//           CLOSE
//         </button>

//         {/* ✅ Flashcard Component (Should Render Here) */}
//         <Flashcard
//           query={question}
//           response={answer}
//           example={code}
//           type="modal"
//         />
//       </div>
//     </div>
//   );
// };

// export default FlashcardModal;

const FlashcardModal = ({ question, answer, code, isOpen, setIsOpen }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative w-2/3 max-w-lg rounded-lg border border-red-500 bg-white p-6 shadow-lg">
        <div>
          {isOpen && (
            <div>
              <Flashcard
                query={question}
                response={answer}
                example={code}
                type={"modal"}></Flashcard>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-primary relative z-20">
                CLOSE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardModal;
