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

const RecentActivity = ({
  data,
  budgets,
  users,
  accounts,
  handleAddTransactions,
  handleDeleteTransaction,
}: {
  handleAddTransactions: (transactions: TransactionLine[]) => Promise<boolean>;
  handleDeleteTransaction: (transactionId: number) => Promise<boolean>;
  data: ThisWeeksTransactionsWithIcon[];
  budgets: DropdownOption[];
  users: DropdownOption[];
  accounts: DropdownOption[];
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState("");

  const closeModal = () => {
    setModalErrorMessage("");
    setModalOpen(false);
  };

  const addTransactions = async (transactions: TransactionLine[]) => {
    const isOK = await handleAddTransactions(transactions);

    if (!isOK) {
      setModalErrorMessage("Invalid Transaction");
      return;
    }

    closeModal();
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <>
          <AddTransactionModalContent
            handleAddTransactions={addTransactions}
            budgetDropdownOption={budgets}
            userDropdownOption={users}
            accountDropdownOption={accounts}
            errorMessage={modalErrorMessage}
            onClose={closeModal}
          />
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
              />
            );
          })}
        </div>
        <button
          className="bgGreenOnHover flex  w-full cursor-pointer justify-center rounded-lg py-2 transition-colors"
          onClick={() => setModalOpen(true)}
        >
          <span className="text-white 2xl:text-xl">Add Transaction</span>
        </button>
      </div>
    </>
  );
};

export { RecentActivity };
