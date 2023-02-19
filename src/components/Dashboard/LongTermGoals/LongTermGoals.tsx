import EllipsisIcon from "../../../../public/ellipsis-icon.svg";
import { GREY } from "../../../utils/constants";
import { type LongTermGoalStatusProps } from "../../../utils/types";
import { LongTermGoalStatus } from "./LongTermGoalStatus";

const LongTermGoals = ({
  longTermGoalData,
}: {
  longTermGoalData: LongTermGoalStatusProps[];
}) => {
  return (
    <div className="flex h-full w-full flex-col justify-start overflow-hidden px-8">
      <div className="flex w-full items-center justify-between ">
        <p
          className="cursor-default text-xl font-light 2xl:text-2xl"
          style={{ color: GREY }}
        >
          Long Term Goals
        </p>
        <EllipsisIcon className="cursor-pointer"></EllipsisIcon>
      </div>
      <div className="flex w-4/6 flex-row flex-wrap justify-between self-center">
        {longTermGoalData.slice(0, 3).map((props, key) => {
          return <LongTermGoalStatus key={key} {...props} />;
        })}
      </div>
    </div>
  );
};

export { LongTermGoals };
