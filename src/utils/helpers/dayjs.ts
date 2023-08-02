import dayjs from "dayjs";

export const getMonthsWeekDates = (month: string | null) => {
  //defaults to current month if month not passed in
  const activeMonth = !month
    ? dayjs().month()
    : dayjs().month(Number(month)).month();

  const monthDates = [];

  //is initially set to the first monday of the first week
  let result = dayjs()
    .month(activeMonth)
    .startOf("month")
    .startOf("week")
    .add(1, "day");

  if (result.month() !== activeMonth) {
    result = result.add(7, "day");
  }

  while (result.month() === activeMonth) {
    monthDates.push({
      startDate: result,
      endDate: result.add(6, "day"),
    });

    result = result.add(7, "day");
  }

  return monthDates;
};
