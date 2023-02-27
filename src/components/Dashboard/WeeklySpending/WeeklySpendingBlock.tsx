import type { budgets } from "@prisma/client";
import EllipsisIcon from "../../../../public/ellipsis-icon.svg";
import { GREY } from "../../../utils/constants";
import { BudgetStatus } from "../../BudgetStatus";

const WeeklySpendingBlock = ({
  budgetStatusData,
}: {
  budgetStatusData: budgets[];
}) => {
  const budgets =
    budgetStatusData?.length > 6
      ? budgetStatusData?.slice(0, 6)
      : budgetStatusData?.map((budget) => budget);

  return (
    <div className="flex h-full w-full flex-col justify-start overflow-hidden px-8">
      <div className="flex w-full items-center justify-between">
        <p
          className="cursor-default text-xl font-light 2xl:text-2xl"
          style={{ color: GREY }}
        >
          Weekly Spending
        </p>
        <EllipsisIcon className="cursor-pointer"></EllipsisIcon>
      </div>
      <div className="my-1 flex h-full flex-row flex-wrap justify-between 2xl:my-3">
        {budgets?.map(({ color, name, amount, balance }, key) => {
          return (
            <BudgetStatus
              name={name}
              key={key}
              color={color}
              amount={String(amount)}
              balance={String(balance)}
            ></BudgetStatus>
          );
        })}
      </div>
    </div>
  );
};

export { WeeklySpendingBlock };
