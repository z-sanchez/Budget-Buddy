import { DashboardHeader } from "../components/DashboardHeader";
import NavigationLayout from "../components/layouts/NavigationLayout";
import { LineGraph } from "../components/Dashboard/LineGraph/LineGraph";
import { LongTermGoals } from "../components/Dashboard/LongTermGoals/LongTermGoals";
import { RecentActivity } from "../components/Dashboard/RecentActivity/RecentActivity";
import { WeeklySpendingBlock } from "../components/Dashboard/WeeklySpending/WeeklySpendingBlock";
import { BLUE, GREEN, RED, YELLOW } from "../utils/constants";
import { type BudgetStatusProps } from "../utils/types";
import { type NextPageWithLayout } from "./_app";
import ShoppingIcon from "../../public/shopping-icon.svg";
import { AccountsBlock } from "../components/Dashboard/AccountBalances/AccountsBlock";

const Budgets: NextPageWithLayout = () => {
  return (
    <div className="col-span-1 grid h-screen min-h-[800px] grid-cols-[50%_50%] grid-rows-[13%_25%_auto_25%] gap-2 px-5 py-3">
      <div className="col-span-2">
        <DashboardHeader />
      </div>
      <div className="col-span-1 ">
        {/* <WeeklySpendingBlock budgetStatusData={budgetStatusData} /> */}
      </div>
      <div className="col-span-1">
        {/* <LongTermGoals longTermGoalData={longTermGoalsData} /> */}
      </div>
      <div className="col-span-2">{/* <LineGraph data={data} /> */}</div>
      <div className="col-span-1">
        {/* <RecentActivity data={testTransactions} /> */}
      </div>
      <div className="col-span-1">
        <AccountsBlock />
      </div>
    </div>
  );
};

Budgets.getLayout = (page) => {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default Budgets;
