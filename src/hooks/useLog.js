import { useEffect } from "react";

const useLog = (dataToLog, label = "Enter a label") => {
  useEffect(() => {
    console.log(label, dataToLog);
  }, [dataToLog]);
};
export default useLog;
