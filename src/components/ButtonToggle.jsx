import { MdToggleOn, MdToggleOff } from "react-icons/md";

const ButtonToggle = ({ checked, onToggle }) => {
  return (
    <div className="flex items-center">
      <span className="mr-2 font-medium text-blue-600">Track progress</span>
      <button onClick={onToggle} className="focus:outline-none">
        {checked ? (
          <MdToggleOn className="h-8 w-8 text-blue-600" />
        ) : (
          <MdToggleOff className="h-8 w-8 text-gray-400" />
        )}
      </button>
    </div>
  );
};

export default ButtonToggle;
