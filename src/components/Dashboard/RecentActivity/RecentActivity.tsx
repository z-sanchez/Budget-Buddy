import { useState } from "react";
import { GREY } from "../../../utils/constants";
import EllipsisIcon from "../../../../public/ellipsis-icon.svg";
import { WeeklySpendingTransactionLine } from "./WeeklySpendingTransactionLine";
import {
  type TransactionLine,
  type ThisWeeksTransactionsWithIcon,
} from "../../../utils/types";
import { AddTransactionModalContent } from "./AddTransactionModalContent";
import { Modal } from "@mui/material";
import type { accounts, budgets, users } from "@prisma/client";

const RecentActivity = ({
  data,
  budgets,
  users,
  accounts,
  handleAddTransactions,
}: {
  handleAddTransactions: (transactions: TransactionLine[]) => Promise<boolean>;
  data: ThisWeeksTransactionsWithIcon[];
  budgets: budgets[];
  users: users[];
  accounts: accounts[];
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  const budgetsLabeled = budgets?.map(({ name, id }) => {
    return {
      label: name,
      id,
    };
  });

  const usersLabeled = users?.map(({ name, id }) => {
    return {
      label: name,
      id,
    };
  });

  const accountsLabeled = accounts?.map(({ name, id }) => {
    return {
      label: name,
      id,
    };
  });

  const closeModal = () => {
    setError("");
    setModalOpen(false);
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
            handleAddTransactions={async (transaction) => {
              const isOK = await handleAddTransactions(transaction);

              if (!isOK) {
                setError("Invalid Transaction");
                return;
              }

              closeModal();
            }}
            budgets={budgetsLabeled}
            users={usersLabeled}
            accounts={accountsLabeled}
            error={error}
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
              <WeeklySpendingTransactionLine {...transaction} key={index} />
            );
          })}
        </div>
        <div
          className="bgGreenOnHover flex  w-full cursor-pointer justify-center rounded-lg py-2 transition-colors"
          onClick={() => setModalOpen(true)}
        >
          <p className="text-white 2xl:text-xl">Add Transaction</p>
        </div>
      </div>
    </>
  );
};

export { RecentActivity };
