import { GREEN_STATE, GREY, RED_STATE } from "../../../utils/constants";
import TrashIcon from "../../../../public/trash-icon.svg";
import EditIcon from "../../../../public/edit-icon.svg";
import ShoppingIcon from "../../../../public/shopping-icon.svg";
import {
  type TransactionLine,
  type ThisWeeksTransactionsWithIcon,
} from "../../../utils/types";
import dayjs from "dayjs";
import { useState } from "react";

type Props = ThisWeeksTransactionsWithIcon & {
  handleDeleteTransaction: (transactionId: string) => Promise<string | true>;
  handleEditTransaction: (transaction: TransactionLine) => void;
};

const WeeklySpendingTransactionLine = ({
  Icon,
  name,
  userName,
  accountName,
  accountId,
  date,
  amount,
  budgetName,
  budgetId,
  accountUserId,
  id,
  handleDeleteTransaction,
  handleEditTransaction,
}: Props) => {
  const [error, setError] = useState("");
  const dateFormatted = dayjs(date).format("L LT");

  const deleteTransaction = async () => {
    const response = await handleDeleteTransaction(id).catch((error) =>
      console.log(error)
    );

    if (typeof response === "string") {
      setError(response);
      return;
    }
    setError("");
  };

  return (
    <div className="my-2 flex w-full flex-row items-center justify-between px-2 lg:w-11/12">
      <div className="flex w-8/12 items-center">
        <div
          className="mr-5 flex items-center justify-center rounded-lg p-1 outline outline-1"
          style={{ outlineColor: GREY }}
        >
          <Icon className="h-8 w-8" />
        </div>
        <div className="flex flex-col">
          <p className="truncate">
            {name}{" "}
            {error && (
              <span
                className="ml-5 cursor-pointer bg-red-100 px-2 py-1"
                style={{ color: RED_STATE }}
                onClick={() => setError("")}
              >
                {error}
              </span>
            )}
          </p>
          <p className="poppinsFont truncate" style={{ color: GREY }}>
            {dateFormatted} by {userName}
          </p>
        </div>
      </div>
      <p
        className="poppinsFont"
        style={{ color: amount < 0 ? RED_STATE : GREEN_STATE }}
      >
        {amount < 0 ? "-" : ""}${Math.abs(amount)}
      </p>
      <div className="flex w-1/12 items-center justify-between">
        <EditIcon
          className="icon--hoverGreen w-5 cursor-pointer transition-colors"
          onClick={() =>
            handleEditTransaction({
              id,
              budgetName: {
                label: budgetName,
                id: budgetId,
              },
              userName: {
                label: userName,
                id: accountUserId,
              },
              bankAccountName: {
                label: accountName,
                id: accountId,
              },
              transactionName: name,
              transactionAmount: amount,
              date: date,
            })
          }
        />
        <TrashIcon
          className="icon--hoverRed cursor-pointer transition-colors"
          onClick={deleteTransaction}
        />
      </div>
    </div>
  );
};

export { WeeklySpendingTransactionLine };
