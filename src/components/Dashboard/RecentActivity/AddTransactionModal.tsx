import { useEffect, useState } from "react";
import { Autocomplete, Modal, TextField } from "@mui/material";
import { GREEN, GREY, LIGHT_GREY } from "../../../utils/constants";
import CloseIcon from "../../../../public/close-icon.svg";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import CalendarIcon from "../../../../public/calendar-icon.svg";
import type { ElementType } from "react";
import { ClickAwayListener } from "@mui/base";
import PlusIcon from "../../../../public/plus-icon.svg";
import dayjs from "dayjs";

const AddTransactionModal = ({
  modalOpen,
  onClose,
}: {
  modalOpen: boolean;
  onClose: (param: boolean) => void;
}) => {
  const [dateOpen, setDateOpen] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [userName, setUserName] = useState("");
  const [transactionName, setTransactionName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [date, setDate] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    console.log("new transaction: ", {
      budgetName,
      userName,
      transactionAmount,
      transactionName,
      date: dayjs(date).format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
    });
  }, [budgetName, userName, transactionAmount, transactionName, date]);

  const testBudgetName = [
    { label: "Dativity" },
    { label: "Grocery" },
    { label: "Ziek" },
    { label: "Chelsea" },
    { label: "Gas" },
    { label: "Loans" },
  ];

  const testUserName = [{ label: "Ziek" }, { label: "Chelsea" }];

  return (
    <Modal open={modalOpen}>
      <div className="flex h-full items-center justify-center">
        <ClickAwayListener onClickAway={() => onClose(false)}>
          <div className="mb-20 flex h-3/5 w-2/3 flex-col items-start justify-start rounded-md bg-white py-8 px-5 lg:w-1/3">
            <div
              className="flex w-full items-center border-x-0 border-y-0 border-b pb-1"
              style={{ borderColor: LIGHT_GREY }}
            >
              <CloseIcon
                className="mr-12 h-4 w-4 cursor-pointer"
                style={{ color: GREY }}
                onClick={() => onClose(false)}
              />
              <p className="self-center py-4 text-2xl font-light 2xl:text-3xl">
                Add Transaction
              </p>
            </div>

            <div className="my-8 flex w-full flex-col items-center">
              <div className="flex w-full items-end justify-center">
                <div className="flex flex-col">
                  <p className="font-bold">Users</p>
                  <Autocomplete
                    disablePortal
                    id="search-users-recent-activity"
                    options={testUserName}
                    onChange={(_, value) => setUserName(value?.label || "")}
                    sx={{ width: 200 }}
                    value={{ label: userName }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        hiddenLabel
                        size="small"
                        placeholder="Search Users"
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-bold">Budgets</p>
                  <Autocomplete
                    disablePortal
                    id="search-budgets-recent-activity"
                    options={testBudgetName}
                    onChange={(_, value) => setBudgetName(value?.label || "")}
                    sx={{ width: 200 }}
                    value={{ label: budgetName }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        hiddenLabel
                        size="small"
                        placeholder="Search Budgets"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="my-5 flex w-full items-center justify-center">
                <div className="mr-5 flex flex-col">
                  <span className="mr-3 text-lg font-bold">
                    Transaction Name
                  </span>{" "}
                  <input
                    type="text"
                    value={transactionName}
                    onChange={(event) => setTransactionName(event.target.value)}
                    className="py-1"
                    placeholder="transaction name"
                    style={{
                      outline: `1px solid ${LIGHT_GREY}`,
                    }}
                  ></input>
                </div>
                <div className="mr-5">
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
            </div>
            <div className="mt-5 flex w-full justify-center">
              <PlusIcon
                className="h-6 w-6 cursor-pointer rounded-3xl py-1 px-1 outline outline-2 "
                style={{ outlineColor: GREEN, fill: GREEN }}
              />
            </div>
          </div>
        </ClickAwayListener>
      </div>
    </Modal>
  );
};

export { AddTransactionModal };
