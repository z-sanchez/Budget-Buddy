import { BLUE, GREEN, GREY } from "../utils/constants";
import { HeaderBudgetLine } from "./HeaderBudgetLine";

const DashboardHeader = ({
  greeting,
  totalBalance,
}: {
  greeting: string;
  totalBalance: string;
}) => {
  return (
    <div className="h-full min-h-[120px] w-full overflow-hidden py-5">
      <div className="flex items-center justify-between">
        <p className="text-4xl font-light 2xl:text-5xl">{greeting}</p>
        <p className="poppinsFont 2xl:text-md text-xs" style={{ color: GREY }}>
          v 0.0.0
        </p>
      </div>
      <div className="mt-2 flex 2xl:mt-5 ">
        <HeaderBudgetLine
          amount={totalBalance}
          budgetName="Total Balance"
          amountColor={GREEN}
        ></HeaderBudgetLine>
        <HeaderBudgetLine
          amount="12,300"
          budgetName="End of Month Balance"
          amountColor={BLUE}
        ></HeaderBudgetLine>
      </div>
    </div>
  );
};

export { DashboardHeader };
