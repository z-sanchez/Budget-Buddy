import { useState } from "react";
import { GREY } from "../../../utils/constants";
import EllipsisIcon from "../../../../public/ellipsis-icon.svg";
import { WeeklySpendingTransactionLine } from "../WeeklySpending/WeeklySpendingTransactionLine";
import { type ThisWeeksTransactionsWithIcon } from "../../../utils/types";
import { AddTransactionModalContent } from "./AddTransactionModalContent";
import { Modal } from "@mui/material";
import { type budgets, type users } from "@prisma/client";

const RecentActivity = ({
  data,
  budgets,
  users,
}: {
  data: ThisWeeksTransactionsWithIcon[];
  budgets: budgets[];
  users: users[];
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const budgetsLabeled = budgets.map(({ name, id }) => {
    return {
      label: name,
      id,
    };
  });

  const usersLabeled = users.map(({ name, id }) => {
    return {
      label: name,
      id,
    };
  });

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <>
          <AddTransactionModalContent
            budgets={budgetsLabeled}
            users={usersLabeled}
            onClose={() => setModalOpen(false)}
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
