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
  accounts: { accountName: string; id: string }[];
  longTerm?: boolean;
  className?: string;
};

export type LineGraphDataset = {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  tension: number;
};

export type ThisWeeksTransactions = {
  id: string;
  accountName: string;
  accountId: string;
  budgetName: string;
  date: string;
  name: string;
  userName: string;
  amount: number;
  budgetId: string;
  accountUserId: string;
};

export type ThisWeeksTransactionsWithIcon = ThisWeeksTransactions & {
  Icon: string;
};

export type TransactionLine = {
  id: string;
  budgetName: { label: string; id: string };
  userName: { label: string; id: string };
  bankAccountName: { label: string; id: string };
  transactionName: string;
  transactionAmount: number;
  date: string;
};

export type DropdownOption = {
  id: string;
  label: string;
};
