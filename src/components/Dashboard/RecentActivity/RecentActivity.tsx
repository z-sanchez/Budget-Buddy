import { useState } from "react";
import { GREY } from "../../../utils/constants";
import EllipsisIcon from "../../../../public/ellipsis-icon.svg";
import { WeeklySpendingTransactionLine } from "./WeeklySpendingTransactionLine";
import {
  type TransactionLine,
  type ThisWeeksTransactionsWithIcon,
  type DropdownOption,
} from "../../../utils/types";
import { AddTransactionModalContent } from "./AddTransactionModalContent";
import { Modal } from "@mui/material";
import { EditTransactionModalContent } from "./EditTransactionModalContent";

const ADD_MODAL = "add";
const EDIT_MODAL = "edit";

const RecentActivity = ({
  data,
  budgets,
  users,
  accounts,
  handleAddTransactions,
  handleDeleteTransaction,
  handleEditTransaction,
}: {
  handleAddTransactions: (
    transactions: TransactionLine[]
  ) => Promise<string | true>;
  handleDeleteTransaction: (transactionId: number) => Promise<string | true>;
  handleEditTransaction: (
    transaction: TransactionLine
  ) => Promise<string | true>;
  data: ThisWeeksTransactionsWithIcon[];
  budgets: DropdownOption[];
  users: DropdownOption[];
  accounts: DropdownOption[];
}) => {
  const [isModalOpen, setModalOpen] = useState<false | "add" | "edit">(false);
  const [modalErrorMessage, setModalErrorMessage] = useState("");
  const [editableTransaction, setEditableTransaction] = useState({
    id: 0,
    budgetName: {
      label: "",
      id: 0,
    },
    userName: {
      label: "",
      id: 0,
    },
    accountName: {
      label: "",
      id: 0,
    },
    transactionName: "name",
    transactionAmount: 0,
    date: "",
  });

  const closeModal = () => {
    setModalErrorMessage("");
    setModalOpen(false);
  };

  const addTransactions = async (transactions: TransactionLine[]) => {
    const response = await handleAddTransactions(transactions);

    if (typeof response === "string") {
      setModalErrorMessage(response);
      return;
    }

    closeModal();
  };

  const editTransaction = async (transaction: TransactionLine) => {
    const response = await handleEditTransaction(transaction);

    if (typeof response === "string") {
      setModalErrorMessage(response);
      return;
    }

    closeModal();
  };

  return (
    <>
      <Modal
        open={isModalOpen !== false}
        onClose={closeModal}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <>
          {isModalOpen === ADD_MODAL ? (
            <AddTransactionModalContent
              handleAddTransactions={addTransactions}
              budgetDropdownOption={budgets}
              userDropdownOption={users}
              accountDropdownOption={accounts}
              errorMessage={modalErrorMessage}
              onClose={closeModal}
            />
          ) : (
            <EditTransactionModalContent
              handleEditTransaction={editTransaction}
              transaction={editableTransaction}
              budgetDropdownOption={budgets}
              userDropdownOption={users}
              accountDropdownOption={accounts}
              errorMessage={modalErrorMessage}
              onClose={closeModal}
            />
          )}
        </>
      </Modal>
      <div className="flex h-full w-full flex-col justify-start overflow-hidden px-8">
        <div className="flex w-full items-center justify-between">
          <p
            className="cursor-default text-xl font-light 2xl:text-2xl"
            style={{ color: GREY }}
          >
            Recent Activity
          </p>
          <EllipsisIcon className="cursor-pointer"></EllipsisIcon>
        </div>
        <div className=" my-auto flex h-2/3 flex-row flex-wrap items-start justify-center overflow-y-scroll ">
          {data?.map((transaction, index: number) => {
            return (
              <WeeklySpendingTransactionLine
                {...transaction}
                key={index}
                handleDeleteTransaction={handleDeleteTransaction}
                handleEditTransaction={(transaction: TransactionLine) => {
                  setEditableTransaction(transaction);
                  setModalOpen(EDIT_MODAL);
                }}
              />
            );
          })}
        </div>
        <button
          className="bgGreenOnHover flex  w-full cursor-pointer justify-center rounded-lg py-2 transition-colors"
          onClick={() => setModalOpen(ADD_MODAL)}
        >
          <span className="text-white 2xl:text-xl">Add Transaction</span>
        </button>
      </div>
    </>
  );
};

export { RecentActivity };
