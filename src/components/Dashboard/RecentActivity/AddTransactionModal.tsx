import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { GREY, LIGHT_GREY } from "../../../utils/constants";
import CloseIcon from "../../../../public/close-icon.svg";
import { ClickAwayListener } from "@mui/base";
import PlusIcon from "../../../../public/plus-icon.svg";
import { TransactionFormBlock } from "./TransactionFormBlock";

const AddTransactionModal = ({
  isModalOpen,
  onClose,
}: {
  isModalOpen: boolean;
  onClose: () => void;
}) => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      budgetName: { label: "", name: "" },
      userName: { label: "", name: "" },
      transactionName: "",
      transactionAmount: 0,
      date: "",
    },
  ]);

  const addTransactionForm = () => {
    const newTransactions = transactions.map((transaction) => {
      return { ...transaction };
    });

    newTransactions.push({
      id: transactions.length + 1,
      budgetName: { label: "", name: "" },
      userName: { label: "", name: "" },
      transactionName: "",
      transactionAmount: 0,
      date: "",
    });

    setTransactions(newTransactions);
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={onClose}
      keepMounted={false}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div className="mb-20 flex h-3/5 w-2/3 flex-col items-start justify-start  rounded-md bg-white  lg:w-1/3">
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
                <TransactionFormBlock {...transaction} />
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
        <div className="bgGreenOnHover my-2 ml-auto mr-5 flex w-1/3 cursor-pointer justify-center self-center rounded-lg py-2 transition-colors">
          <p className="text-white 2xl:text-xl">Add Transactions</p>
        </div>
      </div>
    </Modal>
  );
};

export { AddTransactionModal };
