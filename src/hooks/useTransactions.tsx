import { api } from "../utils/api";
import {
  type TransactionLine,
  type ThisWeeksTransactions,
} from "../utils/types";
import ShoppingIcon from "../../public/shopping-icon.svg";
import dayjs from "dayjs";
import { type Transaction } from "@prisma/client";

const useTransactions = () => {
  const ctx = api.useContext();

  const thisWeeksTransactions =
    api.transactions.getThisWeeksTransactions.useQuery()
      .data as ThisWeeksTransactions[];

  const transactionsWithIcon = thisWeeksTransactions?.map((transaction) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { ...transaction, Icon: ShoppingIcon };
  });

  const makeTransactionsMutation =
    api.transactions.makeTransactions.useMutation({
      onSuccess: () => {
        void ctx.transactions.getThisWeeksTransactions.invalidate();
        void ctx.bankAccounts.getAllBankAccounts.invalidate();
        void ctx.bankAccounts.getTotalBalance.invalidate();
      },
    });

  const deleteTransactionMutation =
    api.transactions.deleteTransaction.useMutation({
      onSuccess: () => {
        void ctx.transactions.getThisWeeksTransactions.invalidate();
        void ctx.bankAccounts.getAllBankAccounts.invalidate();
        void ctx.bankAccounts.getTotalBalance.invalidate();
      },
    });

  const editTransactionMutation = api.transactions.editTransaction.useMutation({
    onSuccess: () => {
      void ctx.transactions.getThisWeeksTransactions.invalidate();
      void ctx.bankAccounts.getAllBankAccounts.invalidate();
      void ctx.bankAccounts.getTotalBalance.invalidate();
      void ctx.transactions.getTransactionById.invalidate();
    },
  });

  const getTransactionById = (transactionId: string) => {
    return api.transactions.getTransactionById.useQuery(transactionId);
  };

  const addTransactions = async (
    transactions: TransactionLine[]
  ): Promise<string | true> => {
    const formatttedTransactions = transactions.map((transaction) => {
      return {
        amount: Number(transaction.transactionAmount),
        accountId: transaction.bankAccountName.id,
        userId: transaction.userName.id,
        budgetId: transaction.budgetName.id,
        name: transaction.transactionName,
        date: dayjs(transaction.date).toDate(),
      };
    });

    try {
      const response = await makeTransactionsMutation.mutateAsync(
        formatttedTransactions
      );

      return typeof response === "string" ? response : true;
    } catch (error) {
      return "Invalid Transaction";
    }
  };

  const editTransaction = async (
    transaction: TransactionLine
  ): Promise<string | true> => {
    const formatttedTransaction = {
      id: transaction.id,
      amount: Number(transaction.transactionAmount),
      accountId: transaction.bankAccountName.id,
      userId: transaction.userName.id,
      budgetId: transaction.budgetName.id,
      name: transaction.transactionName,
      date: dayjs(transaction.date).toDate(),
    };

    try {
      const response = await editTransactionMutation.mutateAsync(
        formatttedTransaction
      );
      return typeof response === "string" ? response : true;
    } catch (error) {
      return "Invalid Transaction";
    }
  };

  const editTransactionProperties = async (
    transaction: Transaction
  ): Promise<void> => {
    const formatttedTransaction = {
      ...transaction,
      amount: Number(transaction.amount),
      date: dayjs(transaction.date).toDate(),
    };

    try {
      await editTransactionMutation.mutateAsync({
        ...formatttedTransaction,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteTransaction = async (
    transactionId: string
  ): Promise<true | string> => {
    try {
      const response = await deleteTransactionMutation.mutateAsync(
        transactionId
      );
      return typeof response === "string" ? response : true;
    } catch (error) {
      return "Invalid Transaction";
    }
  };

  return {
    thisWeeksTransactions,
    transactionsWithIcon,
    getTransactionById,
    addTransactions,
    deleteTransaction,
    editTransaction,
    editTransactionProperties,
  };
};

export { useTransactions };
