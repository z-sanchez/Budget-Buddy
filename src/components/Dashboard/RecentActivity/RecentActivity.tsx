import { GREEN, GREY } from "../../../utils/constants";
import EllipsisIcon from "../../../../public/ellipsis-icon.svg";
import { WeeklySpendingTransactionLine } from "../WeeklySpending/WeeklySpendingTransactionLine";
import { type WeeklySpendingTransactionLineProps } from "../../../utils/types";

const RecentActivity = ({
  data,
}: {
  data: WeeklySpendingTransactionLineProps[];
}) => {
  return (
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
        {data.map(
          (transaction: WeeklySpendingTransactionLineProps, index: number) => {
            return (
              <WeeklySpendingTransactionLine {...transaction} key={index} />
            );
          }
        )}
      </div>
      <div className="bgGreenOnHover flex  w-full cursor-pointer justify-center rounded-lg py-2 transition-colors">
        <p className="text-white 2xl:text-xl">Add Transaction</p>
      </div>
    </div>
  );
};

export { RecentActivity };
