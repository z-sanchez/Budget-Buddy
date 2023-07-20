import { api } from "../utils/api";

export const useBudgets = () => {
  const ctx = api.useContext();

  const getMonthsBudgets = (monthId: string) => {
    return api.budgets.getMonthsBudgets.useQuery(monthId).data;
  };

  return {
    getMonthsBudgets,
  };
};
