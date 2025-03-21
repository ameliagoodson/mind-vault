import Button from "./Button";
import { MdSave, MdCheck } from "react-icons/md";
import LoadingSpinner from "./LoadingSpinner";

const SaveButton = ({ isLoading, isSaved, btntext, onClick }) => {
  const getButtonText = () => {
    if (isLoading) {
      return "Saving...";
    }
    if (isSaved) {
      return "Saved";
    }
    if (!isSaved && !btntext) {
      return "Save";
    }
    if (!isSaved && btntext) {
      return btntext;
    }
  };

  const getButtonIcon = () => {
    if (isLoading) {
      return (
        <>
          <LoadingSpinner size="16px" className="mr-2 text-white" />
        </>
      );
    }
    if (isSaved) {
      return (
        <>
          <MdCheck className="icon-btn" />
        </>
      );
    }
    if (!isSaved && !isLoading) {
      return (
        <>
          <MdSave className="icon-btn" />
        </>
      );
    }
  };
  return (
    <div>
      <Button
        btntext={getButtonText()}
        icon={getButtonIcon()}
        cssClasses={isSaved ? "btn btn-disabled flex" : "btn btn-primary"}
        disabled={isSaved}
        onClick={onClick}
      />
    </div>
  );
};

export default SaveButton;
