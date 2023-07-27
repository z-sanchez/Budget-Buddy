import dayjs from "dayjs";

export const getCurrentMonthsWeekDates = () => {
  const currentMonth = dayjs().month();
  const monthDates = [];

  //is initially set to the first monday of the first week
  let result = dayjs().startOf("month").startOf("week").add(1, "day");

  if (result.month() !== currentMonth) {
    result = result.add(7, "day");
  }

  while (result.month() === currentMonth) {
    monthDates.push({
      startDate: result,
      endDate: result.add(6, "day"),
    });

    result = result.add(7, "day");
  }

  return monthDates;
};
