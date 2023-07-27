import { DashboardHeader } from "../../components/DashboardHeader";
import NavigationLayout from "../../components/layouts/NavigationLayout";
import { type NextPageWithLayout } from "../_app";
import { BudgetsSection } from "../../components/Budgets/BudgetsSection/BudgetsSection";
import { WeeklyBudgetSection } from "../../components/Budgets/WeeklyBudgetSection/WeeklyBudgetSection";
import { api } from "../../utils/api";
import { getCurrentMonthsWeekDates } from "../../utils/helpers/dayjs";

const Budgets: NextPageWithLayout = () => {
  const totalBalance = api.bankAccounts.getTotalBalance.useQuery().data ?? "";

  console.log({ results: getCurrentMonthsWeekDates() });

  return (
    <div className="col-span-1 grid h-screen min-h-[800px] grid-cols-[100%] grid-rows-[13%_auto] gap-y-2 px-5 py-3">
      <div className="col-span-1">
        <DashboardHeader
          greeting={"Budgets"}
          totalBalance={String(totalBalance)}
        />
      </div>
      <div className="col-span-1 pb-8">
        <BudgetsSection />
        <WeeklyBudgetSection />
      </div>
    </div>
  );
};

Budgets.getLayout = (page) => {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default Budgets;
