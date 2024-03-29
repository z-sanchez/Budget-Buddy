import { type Budget } from "@prisma/client";
import dayjs from "dayjs";
import { type ThisWeeksTransactions, type LineGraphDataset } from "../types";

const labels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//takes arrays of budgets and transactions, maps values to a line graph dataset
export const createWeekBudgetSpendingLineGraphData = ({
  transactions,
  budgets,
}: {
  budgets: Budget[];
  transactions: ThisWeeksTransactions[];
}) => {
  const data: LineGraphDataset[] = [];

  budgets?.forEach((budget) => {
    const dataset: LineGraphDataset = {
      label: "",
      data: [0, 0, 0, 0, 0, 0, 0],
      fill: false,
      borderColor: "",
      tension: 0.4,
    };

    const transactionData = transactions?.filter(
      ({ budgetId }) => budget.id === budgetId
    );

    transactionData?.forEach(({ date, amount }) => {
      const dayOfWeek = dayjs(date).day();
      dataset.data[dayOfWeek] += Number(Math.abs(amount));
    });
    dataset.label = budget.name;
    dataset.borderColor = budget.color;

    data.push(dataset);
  });

  return {
    labels,
    datasets: data,
  };
};
