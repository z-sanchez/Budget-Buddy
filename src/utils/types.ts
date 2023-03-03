export type BudgetStatusProps = {
  amount: string;
  balance: string;
  color: string;
  name: string;
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
