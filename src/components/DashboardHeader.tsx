import { BLUE, GREEN, GREY } from "../utils/constants";
import { HeaderBudgetLine } from "./HeaderBudgetLine";

const DashboardHeader = () => {
  return (
    <div className="h-full w-full overflow-hidden py-5">
      <div className="flex items-center justify-between">
        <p className="text-4xl font-thin 2xl:text-5xl">Good Evening, Ziek!</p>
        <p className="poppinsFont text-lg 2xl:text-2xl" style={{ color: GREY }}>
          Jan 20, 2023 5:30pm
        </p>
      </div>
      <div className="mt-2 flex 2xl:mt-5 ">
        <HeaderBudgetLine
          amount="12,300"
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
