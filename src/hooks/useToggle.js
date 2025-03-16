import { useState } from "react";

const useToggle = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const toggleValue = (newValue) => {
    setValue((prev) => (typeof newValue === "boolean" ? newValue : !prev));
  };

  return [value, toggleValue];
};

export default useToggle;
