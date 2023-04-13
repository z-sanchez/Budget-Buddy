import React, { useState } from "react";
import { GREY, LIGHT_GREY, RED_STATE } from "../../../utils/constants";
import CloseIcon from "../../../../public/close-icon.svg";
import { TransactionFormBlock } from "./TransactionFormBlock";
import {
  type DropdownOption,
  type TransactionLine,
} from "../../../utils/types";

const EditTransactionModalContent = ({
  handleEditTransaction,
  onClose,
  transaction,
  budgetDropdownOption,
  userDropdownOption,
  accountDropdownOption,
  errorMessage,
}: {
  handleEditTransaction: (transaction: TransactionLine) => Promise<void>;
  onClose: () => void;
  transaction: TransactionLine;
  budgetDropdownOption: DropdownOption[];
  userDropdownOption: DropdownOption[];
  accountDropdownOption: DropdownOption[];
  errorMessage?: string;
}) => {
  const [modifiedTransaction, setModifiedTransaction] = useState(transaction);

  const changeTransaction = (changedTransaction: TransactionLine) => {
    setModifiedTransaction({ ...changedTransaction });
  };

  const editTransaction = () => {
    void handleEditTransaction(modifiedTransaction);
  };

  return (
    <div className="mb-20 flex h-3/5 w-2/3 min-w-[640px] flex-col items-start justify-start rounded-md bg-white lg:w-1/3">
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
          {errorMessage && (
            <span
              className="rounded-sm bg-red-100 px-2 py-1 text-sm transition-colors"
              style={{ color: RED_STATE }}
            >
              {errorMessage}
            </span>
          )}
        </p>
      </div>

      <div className="w-full overflow-y-scroll px-5 pt-5 pb-10">
        <TransactionFormBlock
          budgetDropdownOption={budgetDropdownOption}
          userDropdownOption={userDropdownOption}
          accountDropdownOption={accountDropdownOption}
          changeTransaction={(changedTransaction) =>
            changeTransaction(changedTransaction)
          }
          deleteTransaction={() => null}
          disableDelete={true}
          {...modifiedTransaction}
        />
      </div>
      <button
        onClick={editTransaction}
        className="bgGreenOnHover my-2 mt-auto ml-auto mr-5 flex w-1/3 cursor-pointer justify-center self-center rounded-lg py-2 transition-colors"
      >
        <p className="text-white 2xl:text-xl">Edit Transaction</p>
      </button>
    </div>
  );
};

export { EditTransactionModalContent };
