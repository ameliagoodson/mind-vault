import classNames from "classnames";
import { useState, useEffect } from "react";

const Flashcard = ({ query, response, type, shouldReset }) => {
  const [editMode, setEditMode] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [save, setSave] = useState(false);

  const handleSave = () => {
    setSave(true);
    setEditMode(false);
  };

  const handleEdit = () => {
    if (!save) {
      setQuestionText(query);
      setAnswerText(response);
    }
    setEditMode(true);
  };

  useEffect(() => {
    if (shouldReset) {
      setQuestionText("Your answer will appear here");
      setAnswerText("Your question will appear here");
      setSave(false);
    }
  }, [shouldReset]);

  return (
    <div>
      <div
        className={classNames("flashcard", {
          "flashcard-preview": type === "preview",
        })}>
        <div className="flashcard-body w-full">
          {editMode == true ? (
            // EDIT
            <div className="edit-mode">
              <label className="mb-4 text-2xl">Front</label>
              <textarea
                className="text-area"
                value={questionText}
                onChange={(event) =>
                  setQuestionText(event.target.value)
                }></textarea>
              <label className="text-2xl">Back</label>
              <textarea
                className="text-area"
                value={answerText}
                onChange={(event) =>
                  setAnswerText(event.target.value)
                }></textarea>
            </div>
          ) : (
            // VIEW
            <div className="view-mode">
              <h4 className="mb-6 text-2xl">
                {save == true
                  ? questionText
                  : query || "Your question will appear here"}
              </h4>
              <h4 className="text-2xl">
                {save == true
                  ? answerText
                  : response || "Your answer will appear here"}
              </h4>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-around">
        <button onClick={() => handleEdit()} className="btn-primary">
          Edit
        </button>
        <button onClick={() => handleSave()} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
