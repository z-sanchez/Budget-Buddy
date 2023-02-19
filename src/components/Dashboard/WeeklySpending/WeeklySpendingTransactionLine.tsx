import { GREEN_STATE, GREY, RED_STATE } from "../../../utils/constants";
import EllipsisIcon from "../../../../public/ellipsis-icon.svg";
import EditIcon from "../../../../public/edit-icon.svg";
import { type WeeklySpendingTransactionLineProps } from "../../../utils/types";

const WeeklySpendingTransactionLine = ({
  Icon,
  transactionName,
  transactionDate,
  transactionTime,
  transactionUser,
  transactionAmount,
}: WeeklySpendingTransactionLineProps) => {
  return (
    <div className="my-2 flex w-11/12 flex-row items-center justify-between xl:w-5/6">
      <div
        className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg outline outline-1 2xl:h-10 2xl:w-10"
        style={{ outlineColor: GREY }}
      >
        <Icon />
      </div>
      <div className="flex w-64 flex-col">
        <p className="2xl:text-xl ">{transactionName}</p>
        <p className="poppinsFont  text-xs 2xl:text-sm" style={{ color: GREY }}>
          {transactionDate} {transactionTime} by {transactionUser}
        </p>
      </div>
      <p
        className="poppinsFont 2xl:text-xl"
        style={{ color: transactionAmount < 0 ? RED_STATE : GREEN_STATE }}
      >
        {transactionAmount < 0 ? "-" : ""}${Math.abs(transactionAmount)}
      </p>
      <div className="flex">
        <EditIcon className="mr-5 cursor-pointer" />
        <EllipsisIcon className="cursor-pointer" />
      </div>
    </div>
  );
};

export { WeeklySpendingTransactionLine };
