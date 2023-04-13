import { api } from "../utils/api";
import {
  type TransactionLine,
  type ThisWeeksTransactions,
} from "../utils/types";
import ShoppingIcon from "../../public/shopping-icon.svg";
import dayjs from "dayjs";

const useTransactions = () => {
  const ctx = api.useContext();

  const thisWeeksTransactions =
    api.transactions.getThisWeeksTransactions.useQuery()
      .data as ThisWeeksTransactions[];

  const transactionsWithIcon = thisWeeksTransactions?.map((transaction) => {
    return { ...transaction, Icon: ShoppingIcon as string };
  });

  const makeTransactionsMutation =
    api.transactions.makeTransactions.useMutation({
      onSuccess: () => {
        void ctx.transactions.getThisWeeksTransactions.invalidate();
      },
    });

  const deleteTransactionMutation =
    api.transactions.deleteTransaction.useMutation({
      onSuccess: () => {
        void ctx.transactions.getThisWeeksTransactions.invalidate();
      },
    });

  const editTransactionMutation = api.transactions.editTransaction.useMutation({
    onSuccess: () => {
      void ctx.transactions.getThisWeeksTransactions.invalidate();
    },
  });

  const addTransactions = async (
    transactions: TransactionLine[]
  ): Promise<boolean> => {
    const formatttedTransactions = transactions.map((transaction) => {
      return {
        amount: Number(transaction.transactionAmount),
        accountId: transaction.accountName.id,
        userId: transaction.userName.id,
        budgetId: transaction.budgetName.id,
        name: transaction.transactionName,
        date: dayjs(transaction.date).toDate(),
      };
    });

    try {
      await makeTransactionsMutation.mutateAsync(formatttedTransactions);
      return true;
    } catch (error) {
      return false;
    }
  };

  const editTransaction = async (
    transaction: TransactionLine
  ): Promise<boolean> => {
    const formatttedTransaction = {
      id: transaction.id,
      amount: Number(transaction.transactionAmount),
      accountId: transaction.accountName.id,
      userId: transaction.userName.id,
      budgetId: transaction.budgetName.id,
      name: transaction.transactionName,
      date: dayjs(transaction.date).toDate(),
    };

    try {
      await editTransactionMutation.mutateAsync(formatttedTransaction);
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteTransaction = async (transactionId: number): Promise<boolean> => {
    try {
      await deleteTransactionMutation.mutateAsync(transactionId);
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    thisWeeksTransactions,
    transactionsWithIcon,
    addTransactions,
    deleteTransaction,
    editTransaction,
  };
};

export { useTransactions };
