import { type Transaction, type budgets } from "@prisma/client";
import { type LineGraphDataset } from "../types";

const labels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const createLineGraphData = ({
  budgets,
  transactions,
}: {
  budgets: budgets[];
  transactions: Transaction[];
}) => {
  const data: LineGraphDataset[] = [];

  budgets?.forEach((budget) => {
    const dataset: LineGraphDataset = {
      label: "",
      data: [],
      fill: false,
      borderColor: "",
      tension: 0.4,
    };

    const transactionData = transactions?.filter(
      ({ budgetId }) => budget.id === budgetId
    );

    dataset.data = transactionData?.map(({ amount }) => Number(amount));

    dataset.label = budget.name;
    dataset.borderColor = budget.color;

    data.push(dataset);
  });

  return {
    labels,
    datasets: data,
  };
};
