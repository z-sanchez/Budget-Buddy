import { useCallback, useState } from "react";
import { LIGHT_GREY, RED_STATE } from "../../../utils/constants";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import CalendarIcon from "../../../../public/calendar-icon.svg";
import type { ElementType } from "react";
import dayjs from "dayjs";
import { DropdownSelect } from "../../DropdownSelect";
import {
  type DropdownOption,
  type TransactionLine,
} from "../../../utils/types";

const TransactionFormBlock = ({
  id,
  budgetName,
  userName,
  accountName,
  transactionName,
  transactionAmount,
  date,
  changeTransaction,
  deleteTransaction,
  budgetDropdownOption,
  userDropdownOption,
  accountDropdownOption,
  disableDelete,
}: TransactionLine & {
  changeTransaction: (transaction: TransactionLine) => void;
  deleteTransaction: (transaction: TransactionLine) => void;
  budgetDropdownOption: DropdownOption[];
  userDropdownOption: DropdownOption[];
  accountDropdownOption: DropdownOption[];
  disableDelete?: boolean;
}) => {
  const [dateOpen, setDateOpen] = useState(false);
  const [isIncome, setIsIncome] = useState(() =>
    transactionAmount > 0 ? true : false
  );
  const [transactionNameValue, setTransactionName] = useState(transactionName);
  const [transactionAmountValue, setTransactionAmount] =
    useState(transactionAmount);
  const [dateValue, setDate] = useState(date);

  const handleChangeTransaction = useCallback(
    (updatedFields?: {
      budgetName?: DropdownOption;
      userName?: DropdownOption;
      accountName?: DropdownOption;
      amount?: number;
    }) => {
      changeTransaction({
        id,
        budgetName,
        userName,
        accountName,
        transactionAmount: updatedFields?.amount
          ? updatedFields.amount
          : transactionAmountValue,
        transactionName: transactionNameValue,
        date: dayjs(dateValue).toISOString(),
        ...updatedFields,
      });
    },
    [
      budgetName,
      userName,
      accountName,
      id,
      transactionAmountValue,
      transactionNameValue,
      dateValue,
      changeTransaction,
    ]
  );

  const handleDeleteTransaction = () => {
    deleteTransaction({
      id,
      budgetName,
      userName,
      accountName,
      transactionAmount: transactionAmountValue,
      transactionName: transactionNameValue,
      date: dayjs(dateValue).toISOString(),
    });
  };

  const errorMessage = () => {
    let message = "Please enter: ";
    const emptyFields = [];

    if (transactionNameValue === "") emptyFields.push("Transaction Name");
    if (userName.id === 0) emptyFields.push("User");
    if (budgetName.id === 0) emptyFields.push("Budget");
    if (accountName.id === 0) emptyFields.push("Account");
    if (dateValue === "Invalid Date") emptyFields.push("Date");

    if (emptyFields.length) {
      message += emptyFields.join(", ");

      return (
        <p
          className="mb-3 rounded-sm bg-red-100 px-2 py-1"
          style={{ color: RED_STATE }}
        >
          {message}
        </p>
      );
    }

    return null;
  };

  return (
    <>
      {errorMessage()}
      <div className="mb-5 flex h-16 w-full flex-col justify-between">
        <span className="mr-3 text-lg font-bold">Transaction Name</span>{" "}
        <input
          type="text"
          value={transactionNameValue}
          onChange={(event) => setTransactionName(event.target.value)}
          onBlur={() => handleChangeTransaction()}
          className="w-full py-1 px-3"
          placeholder="transaction name"
          style={{
            outline: `1px solid ${LIGHT_GREY}`,
          }}
        ></input>
      </div>
      <div className="mb-5 flex h-16 w-full flex-col justify-between">
        <p className="font-bold">Users</p>
        <DropdownSelect
          options={userDropdownOption}
          value={userName}
          placeholder="Select Users"
          onChange={(value) => {
            handleChangeTransaction({ userName: value });
          }}
        />
      </div>
      <div className="mb-5 flex h-16 w-full flex-col justify-between">
        <p className="font-bold">Budgets</p>
        <DropdownSelect
          options={budgetDropdownOption}
          value={budgetName}
          placeholder="Select Budgets"
          onChange={(value) => {
            handleChangeTransaction({ budgetName: value });
          }}
        />
      </div>
      <div className="mb-5 flex h-16 w-full flex-col justify-between">
        <p className="font-bold">Accounts</p>
        <DropdownSelect
          options={accountDropdownOption}
          value={accountName}
          placeholder="Select Budgets"
          onChange={(value) => {
            handleChangeTransaction({ accountName: value });
          }}
        />
      </div>
      <div className="mr-5 flex items-center ">
        <label htmlFor="income-checkbox" className="mr-3">
          Income
        </label>
        <input
          type="checkbox"
          value={"income"}
          checked={isIncome}
          name="income-checkbox"
          onChange={() => {
            setIsIncome((prev) => !prev);
            const adjustedTransactionAmount = Math.abs(transactionAmountValue);
            const amount = !isIncome
              ? adjustedTransactionAmount
              : adjustedTransactionAmount * -1;
            setTransactionAmount(amount);
            handleChangeTransaction({ amount });
          }}
        ></input>
      </div>
      <div className="flex w-full items-center">
        <div className="mr-5">
          <span className="mr-3 text-lg font-bold">$</span>{" "}
          <input
            type="number"
            value={transactionAmountValue}
            min={isIncome ? 1 : -9999}
            max={isIncome ? 9999 : -1}
            onChange={(event) =>
              setTransactionAmount(Number(event.target.value))
            }
            onBlur={() => handleChangeTransaction()}
            className="w-20 pr-3 text-center"
            placeholder="amount"
            style={{
              outline: `1px solid ${LIGHT_GREY}`,
            }}
          ></input>
        </div>
        <DesktopDateTimePicker
          renderInput={({ inputRef }) => (
            <div ref={inputRef}>
              <CalendarIcon
                className="mr-5 h-7 w-7 cursor-pointer"
                onClick={() => setDateOpen((prev) => !prev)}
              />
            </div>
          )}
          value={dateValue}
          disableFuture
          onChange={(newValue) => {
            setDate(newValue || "");
            handleChangeTransaction();
          }}
          onClose={() => setDateOpen(false)}
          open={dateOpen}
          components={{
            OpenPickerIcon: CalendarIcon as ElementType,
          }}
        />
        {!disableDelete && (
          <button
            onClick={handleDeleteTransaction}
            className="flex w-40 cursor-pointer justify-center self-center rounded-lg bg-white py-2 text-red-500 transition-colors hover:bg-red-500 hover:text-white hover:outline-transparent"
          >
            <p>Remove Transaction</p>
          </button>
        )}
      </div>
    </>
  );
};

export { TransactionFormBlock };
