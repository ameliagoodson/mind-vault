import { useEffect } from "react";

const useLog = (dataToLog) => {
  useEffect(() => {
    console.log(dataToLog);
  }, [dataToLog]);
};
export default useLog;
