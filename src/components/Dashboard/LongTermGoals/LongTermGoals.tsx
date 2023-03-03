import { type longTerm } from "@prisma/client";
import EllipsisIcon from "../../../../public/ellipsis-icon.svg";
import { GREY } from "../../../utils/constants";
import { LongTermGoalStatus } from "./LongTermGoalStatus";

const LongTermGoals = ({
  longTermGoalData,
}: {
  longTermGoalData: longTerm[];
}) => {
  const longTermGoalsToRender =
    longTermGoalData?.length > 3
      ? longTermGoalData?.slice(0, 3)
      : longTermGoalData;

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
        {longTermGoalsToRender?.map((props, key) => {
          return <LongTermGoalStatus key={key} {...props} />;
        })}
      </div>
    </div>
  );
};

export { LongTermGoals };
