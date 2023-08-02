import dayjs from "dayjs";
import { createContext } from "react";

export const getMonthValue = () => {
  //is initially set to the first monday of the first week
  const monthValue = String(
    dayjs().startOf("month").startOf("week").add(1, "day").month()
  );

  return {
    month: monthValue,
  };
};

export const DateContext = createContext(getMonthValue());
