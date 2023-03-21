import { type TransactionLine } from "../../../../utils/types";

type Transaction = TransactionLine & {
  type: "added" | "changed" | "deleted";
};

export default function transactionBlockReducer(
  transactions: TransactionLine[],
  transaction: Transaction
) {
  switch (transaction.type) {
    case "added": {
      return [
        ...transactions,
        {
          ...transaction,
        },
      ];
    }
    case "changed": {
      return transactions.map((t) => {
        if (t.id === transaction.id) {
          return { ...transaction };
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return transactions.filter((t) => t.id !== transaction.id);
    }
    default: {
      throw Error(`Unknown action: ${transaction.type as string}`);
    }
  }
}
