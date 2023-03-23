import React, { useReducer } from "react";
import { DATE_FORMAT, GREY, LIGHT_GREY } from "../../../utils/constants";
import CloseIcon from "../../../../public/close-icon.svg";
import PlusIcon from "../../../../public/plus-icon.svg";
import { TransactionFormBlock } from "./TransactionFormBlock";
import transactionBlockReducer from "./reducers/transactionBlockReducer";
import { type TransactionLine } from "../../../utils/types";
import dayjs from "dayjs";

type Budgets = {
  label: string;
  id: number;
};

type Users = {
  label: string;
  id: number;
};

const INITIAL_TRANSACTION: TransactionLine[] = [
  {
    id: 1,
    budgetName: { label: "", id: 0 },
    userName: { label: "", id: 0 },
    transactionName: "",
    transactionAmount: "",
    date: dayjs().format(DATE_FORMAT),
  },
];

const AddTransactionModalContent = ({
  onClose,
  budgets,
  users,
}: {
  onClose: () => void;
  budgets: Budgets[];
  users: Users[];
}) => {
  const [transactions, dispatch] = useReducer(
    transactionBlockReducer,
    INITIAL_TRANSACTION
  );

  const addTransactionForm = () => {
    dispatch({
      type: "added",
      id: transactions.length + 1,
      budgetName: { label: "", id: 0 },
      userName: { label: "", id: 0 },
      transactionName: "",
      transactionAmount: "",
      date: dayjs().format(DATE_FORMAT),
    });
  };

  const changeTransaction = (transaction: TransactionLine) => {
    dispatch({
      type: "changed",
      ...transaction,
    });
  };

  const deleteTransaction = (transaction: TransactionLine) => {
    dispatch({
      type: "deleted",
      ...transaction,
    });
  };

  const submitTransactions = () => {
    console.log("submitted", transactions);
  };

  return (
    <div className="mb-20 flex h-3/5 w-2/3 flex-col items-start justify-start rounded-md bg-white  lg:w-1/3">
      <div
        className="flex w-full items-center border-x-0 border-y-0 border-b bg-white px-5 py-8 pb-1"
        style={{ borderColor: LIGHT_GREY }}
      >
        <CloseIcon
          className="mr-12 h-4 w-4 cursor-pointer"
          style={{ color: GREY }}
          onClick={() => onClose()}
        />
        <p className="self-center py-4 text-2xl font-light 2xl:text-3xl">
          Add Transaction
        </p>
      </div>

      <div className="w-full overflow-y-scroll px-5 pt-5 pb-10">
        {transactions.map((transaction, index) => {
          const addDivider = index + 1 !== transactions.length;

          return (
            <React.Fragment key={transaction.id}>
              <TransactionFormBlock
                budgets={budgets}
                users={users}
                changeTransaction={changeTransaction}
                deleteTransaction={deleteTransaction}
                {...transaction}
              />
              {addDivider && (
                <div
                  style={{ backgroundColor: LIGHT_GREY }}
                  className="my-10 mx-auto h-[1px] w-3/4"
                ></div>
              )}
            </React.Fragment>
          );
        })}

        <PlusIcon
          onClick={() => addTransactionForm()}
          className="plusIconHover mx-auto mt-10 h-6 w-6 cursor-pointer rounded-3xl py-1 px-1 outline outline-2 transition-all"
        />
      </div>
      <div
        onClick={submitTransactions}
        className="bgGreenOnHover my-2 mt-auto ml-auto mr-5 flex w-1/3 cursor-pointer justify-center self-center rounded-lg py-2 transition-colors"
      >
        <p className="text-white 2xl:text-xl">Add Transactions</p>
      </div>
    </div>
  );
};

export { AddTransactionModalContent };
