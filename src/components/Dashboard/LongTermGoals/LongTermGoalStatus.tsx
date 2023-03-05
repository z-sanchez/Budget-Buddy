import { type LongTerm } from "@prisma/client";
import { GREEN_STATE } from "../../../utils/constants";
import { BudgetStatus } from "../../BudgetStatus";
const LongTermGoalStatus = ({
  goal,
  saved,
  color,
  name,
  priority,
}: LongTerm) => {
  const goalMet = Number(saved) > Number(goal);

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
          amount={String(goal)}
          balance={String(saved)}
          color={color}
          name={name}
          outlineColor={goalMet ? GREEN_STATE : ""}
        ></BudgetStatus>
      </div>
    </div>
  );
};

export { LongTermGoalStatus };
