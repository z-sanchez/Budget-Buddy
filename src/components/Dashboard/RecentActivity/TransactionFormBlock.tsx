import { useState } from "react";
import { LIGHT_GREY } from "../../../utils/constants";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import CalendarIcon from "../../../../public/calendar-icon.svg";
import type { ElementType } from "react";
import dayjs from "dayjs";
import { DropdownSelect } from "../../DropdownSelect";
import { type TransactionLine } from "../../../utils/types";

const testBudgetName = [
  { label: "Dativity", name: "Dativity" },
  { label: "Grocery", name: "Grocery" },
  { label: "Ziek", name: "Ziek" },
  { label: "Chelsea", name: "Chelsea" },
  { label: "Gas", name: "Gas" },
  { label: "Loans", name: "Loans" },
];

const testUserName = [
  { label: "Ziek", name: "Ziek" },
  { label: "Chelsea", name: "Chelsea" },
];

const TransactionFormBlock = ({
  id,
  budgetName,
  userName,
  transactionName,
  transactionAmount,
  date,
  changeTransaction,
  deleteTransaction,
}: TransactionLine & {
  changeTransaction: (transaction: TransactionLine) => void;
  deleteTransaction: (transaction: TransactionLine) => void;
}) => {
  const [dateOpen, setDateOpen] = useState(false);
  const [budgetNameValue, setBudgetName] = useState(budgetName);
  const [userNameValue, setUserName] = useState(userName);
  const [transactionNameValue, setTransactionName] = useState(transactionName);
  const [transactionAmountValue, setTransactionAmount] =
    useState(transactionAmount);
  const [dateValue, setDate] = useState(date);

  const handleChangeTransaction = () => {
    changeTransaction({
      id,
      budgetName: budgetNameValue,
      userName: userNameValue,
      transactionAmount: transactionAmountValue,
      transactionName: transactionNameValue,
      date: dayjs(dateValue).format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
    });
  };

  const handleDeleteTransaction = () => {
    deleteTransaction({
      id,
      budgetName: budgetNameValue,
      userName: userNameValue,
      transactionAmount: transactionAmountValue,
      transactionName: transactionNameValue,
      date: dayjs(dateValue).format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
    });
  };

  return (
    <>
      <div className="mb-5 flex h-16 w-full flex-col justify-between">
        <span className="mr-3 text-lg font-bold">Transaction Name</span>{" "}
        <input
          type="text"
          value={transactionNameValue}
          onChange={(event) => setTransactionName(event.target.value)}
          onBlur={handleChangeTransaction}
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
          options={[...testUserName]}
          value={userNameValue}
          placeholder="Select Users"
          onChange={(value) => {
            setUserName(value);
            handleChangeTransaction();
          }}
        />
      </div>
      <div className="mb-5 flex h-16 w-full flex-col justify-between">
        <p className="font-bold">Budgets</p>
        <DropdownSelect
          options={[...testBudgetName]}
          value={budgetNameValue}
          placeholder="Select Budgets"
          onChange={(value) => {
            setBudgetName(value);
            handleChangeTransaction();
          }}
        />
      </div>

      <div className="flex w-full items-center justify-between">
        <div>
          <span className="mr-3 text-lg font-bold">$</span>{" "}
          <input
            type="number"
            value={transactionAmountValue}
            onChange={(event) =>
              setTransactionAmount(Number(event.target.value))
            }
            onBlur={handleChangeTransaction}
            className=" py-1 text-end"
            placeholder="income amount"
            style={{
              outline: `1px solid ${LIGHT_GREY}`,
            }}
          ></input>
        </div>
        <DesktopDateTimePicker
          renderInput={({ inputRef }) => (
            <div ref={inputRef}>
              <CalendarIcon
                className="h-7 w-7 cursor-pointer"
                onClick={() => setDateOpen((prev) => !prev)}
              />
            </div>
          )}
          value={dateValue}
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
        <div
          onClick={handleDeleteTransaction}
          className="flex w-40 cursor-pointer justify-center self-center rounded-lg bg-white py-2 text-red-500 transition-colors hover:bg-red-500 hover:text-white hover:outline-transparent"
        >
          <p>Remove Transaction</p>
        </div>
      </div>
    </>
  );
};

export { TransactionFormBlock };
