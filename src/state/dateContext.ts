import dayjs from "dayjs";
import { createContext } from "react";

export const getMonthValue = () => {
  const monthValue = String(dayjs(new Date()).month());

  return {
    month: monthValue,
  };
};

export const DateContext = createContext(getMonthValue());
