import { useEffect } from "react";

const useLog = (dataToLog) => {
  useEffect(() => {
    console.log("Use log: ", dataToLog);
  }, [dataToLog]);
};
export default useLog;
