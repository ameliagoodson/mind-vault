import { useState } from "react";

const useToggle = (valueToToggle) => {
  const [value, setValue] = useState(valueToToggle);

  const toggleValue = () => {
    setValue((prev) => !prev);
  };

  return [value, toggleValue];
};

export default useToggle;
