export type BudgetStatusProps = {
  amount: string;
  balance: string;
  color: string;
  name: string;
  outlineColor?: string;
  className?: string;
};

export type BudgetStatusDetailedProps = {
  budgetAmount: number;
  budgetBalance: number;
  color: string;
  name: string;
  message: string;
  accounts: { accountName: string; id: number }[];
  longTerm?: boolean;
  className?: string;
};

export interface WeeklySpendingBlockProps {
  budgetStatusData: BudgetStatusProps[];
}

export type WeeklySpendingTransactionLineProps = {
  Icon: any;
  transactionName: string;
  transactionDate: string;
  transactionTime: string;
  transactionUser: string;
  transactionAmount: number;
};

export type LineGraphDataset = {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  tension: number;
};

export type ThisWeeksTransactions = {
  id: number;
  accountName: string;
  budgetName: string;
  date: string;
  name: string;
  userName: string;
  amount: number;
  budgetId: number;
};

export type ThisWeeksTransactionsWithIcon = ThisWeeksTransactions & {
  Icon: string;
};

export type TransactionLine = {
  id: number;
  budgetName: { label: string; name: string };
  userName: { label: string; name: string };
  transactionName: string;
  transactionAmount: number | "";
  date: string;
};
