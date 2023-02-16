import { type LongTermGoalStatusProps } from "../utils/types";
import { BudgetStatus } from "./BudgetStatus";

const LongTermGoalStatus = ({
  budgetAmount,
  budgetBalance,
  color,
  name,
  priority,
}: LongTermGoalStatusProps) => {
  return (
    <div className="my-1 flex w-full items-center justify-between 2xl:my-3">
      <div
        className="flex w-6 justify-center rounded-full outline 2xl:w-7 2xl:rounded-2xl"
        style={{ outlineColor: color }}
      >
        <p className="text-base 2xl:text-xl">{priority}</p>
      </div>
      <div className="flex w-3/4 items-center justify-between">
        <BudgetStatus
          className="my-0 w-full"
          budgetAmount={budgetAmount}
          budgetBalance={budgetBalance}
          color={color}
          name={name}
        ></BudgetStatus>
      </div>
    </div>
  );
};

export { LongTermGoalStatus };
