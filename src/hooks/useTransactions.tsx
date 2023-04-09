import { api } from "../utils/api";
import {
  type TransactionLine,
  type ThisWeeksTransactions,
} from "../utils/types";
import ShoppingIcon from "../../public/shopping-icon.svg";
import dayjs from "dayjs";

const useTransactions = () => {
  const thisWeeksTransactions =
    api.transactions.getThisWeeksTransactions.useQuery()
      .data as ThisWeeksTransactions[];

  const transactionsWithIcon = thisWeeksTransactions?.map((transaction) => {
    return { ...transaction, Icon: ShoppingIcon as string };
  });

  const ctx = api.useContext();

  const makeTransactionsMutation =
    api.transactions.makeTransactions.useMutation({
      onSuccess: () => {
        void ctx.transactions.getThisWeeksTransactions.invalidate();
      },
    });

  const addTransactions = (transactions: TransactionLine[]) => {
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

    makeTransactionsMutation.mutate(formatttedTransactions);
  };

  return {
    thisWeeksTransactions,
    addTransactions,
    transactionsWithIcon,
  };
};

export { useTransactions };
