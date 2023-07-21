import { type Budget } from "@prisma/client";
import { api } from "../utils/api";

export const useBudgets = () => {
  const ctx = api.useContext();

  const makeBudgetMutation = api.budgets.updateMonthBudget.useMutation({
    onSuccess: () => {
      void ctx.budgets.getBudgetData.invalidate();
    },
  });

  const createBudgetMutation = api.budgets.createMonthBudget.useMutation({
    onSuccess() {
      void ctx.budgets.getMonthsBudgets.invalidate();
    },
  });

  const deleteBudgetMutation = api.budgets.deleteBudget.useMutation({
    onSuccess() {
      void ctx.budgets.getMonthsBudgets.invalidate();
    },
  });

  const createBudget = async (monthId: string) => {
    return await createBudgetMutation.mutateAsync(monthId).catch(() => null);
  };

  const getMonthsBudgets = (monthId: string) => {
    return api.budgets.getMonthsBudgets.useQuery(monthId).data;
  };

  const getBudgetData = (budgetId: string) => {
    return api.budgets.getBudgetData.useQuery(budgetId).data;
  };

  const updateMonthsBudget = async (updatedBudget: Budget): Promise<void> => {
    await makeBudgetMutation.mutateAsync({
      ...updatedBudget,
      amount: Number(updatedBudget.amount),
      balance: Number(updatedBudget.balance),
      longTerm: Number(updatedBudget.longTerm ?? 0),
      dashboard: Number(updatedBudget.dashboard ?? 0),
    });
  };

  const deleteBudget = async (budgetId: string) => {
    await deleteBudgetMutation.mutateAsync(budgetId);
  };

  return {
    getMonthsBudgets,
    updateMonthsBudget,
    getBudgetData,
    createBudget,
    deleteBudget,
  };
};
