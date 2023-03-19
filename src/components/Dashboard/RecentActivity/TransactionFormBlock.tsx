import { useEffect, useState } from "react";
import { LIGHT_GREY } from "../../../utils/constants";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import CalendarIcon from "../../../../public/calendar-icon.svg";
import type { ElementType } from "react";
import dayjs from "dayjs";
import { DropdownSelect } from "../../DropdownSelect";

const testBudgetName = [
  { label: "Dativity" },
  { label: "Grocery" },
  { label: "Ziek" },
  { label: "Chelsea" },
  { label: "Gas" },
  { label: "Loans" },
];

const testUserName = [{ label: "Ziek" }, { label: "Chelsea" }];

const TransactionFormBlock = () => {
  const [dateOpen, setDateOpen] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [userName, setUserName] = useState("");
  const [transactionName, setTransactionName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [date, setDate] = useState("");

  useEffect(() => {
    console.log("new transaction: ", {
      budgetName,
      userName,
      transactionAmount,
      transactionName,
      date: dayjs(date).format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
    });
  }, [budgetName, userName, transactionAmount, transactionName, date]);

  return (
    <>
      <div className="mb-5 flex h-16 w-full flex-col justify-between">
        <span className="mr-3 text-lg font-bold">Transaction Name</span>{" "}
        <input
          type="text"
          value={transactionName}
          onChange={(event) => setTransactionName(event.target.value)}
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
          options={testUserName}
          value={userName}
          placeholder="Select Users"
          onChange={(value) => setUserName(value)}
        />
      </div>
      <div className="mb-5 flex h-16 w-full flex-col justify-between">
        <p className="font-bold">Budgets</p>
        <DropdownSelect
          options={testBudgetName}
          value={budgetName}
          placeholder="Select Budgets"
          onChange={(value) => setBudgetName(value)}
        />
      </div>

      <div className="flex  w-1/2  items-center justify-between">
        <div>
          <span className="mr-3 text-lg font-bold">$</span>{" "}
          <input
            type="number"
            value={transactionAmount}
            onChange={(event) =>
              setTransactionAmount(Number(event.target.value))
            }
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
                className="mx-auto h-7 w-7 cursor-pointer"
                onClick={() => setDateOpen((prev) => !prev)}
              />
            </div>
          )}
          value={date}
          onChange={(newValue) => {
            setDate(newValue || "");
          }}
          onClose={() => setDateOpen(false)}
          open={dateOpen}
          components={{
            OpenPickerIcon: CalendarIcon as ElementType,
          }}
        />
      </div>
    </>
  );
};

export { TransactionFormBlock };
