import { DashboardHeader } from "../../components/DashboardHeader";
import NavigationLayout from "../../components/layouts/NavigationLayout";
import { type NextPageWithLayout } from "../_app";
import { BudgetsSection } from "../../components/Budgets/BudgetsSection/BudgetsSection";
import { WeeklyBudgetSection } from "../../components/Budgets/WeeklyBudgetSection/WeeklyBudgetSection";
import { api } from "../../utils/api";
import { useContext, useState } from "react";
import { DateContext } from "../../state/dateContext";
import { MONTH_OPTIONS } from "../../utils/constants";

const Budgets: NextPageWithLayout = () => {
  const totalBalance = api.bankAccounts.getTotalBalance.useQuery().data ?? "";
  const { month } = useContext(DateContext);
  const [activeMonth, setActiveMonth] = useState(() =>
    MONTH_OPTIONS.find(({ id }) => id === month)
  );

  return (
    <div className="col-span-1 grid h-screen min-h-[800px] grid-cols-[100%] grid-rows-[13%_auto] gap-y-2 px-5 py-3">
      <div className="col-span-1">
        <DashboardHeader
          greeting={"Budgets"}
          totalBalance={String(totalBalance)}
        />
      </div>
      <div className="col-span-1 pb-8">
        <BudgetsSection
          activeMonth={activeMonth}
          month={month}
          onMonthChange={(newMonth: {
            id: string;
            label: string;
            abbreviation: string;
          }) => setActiveMonth(newMonth)}
        />
        <WeeklyBudgetSection activeMonth={activeMonth} />
      </div>
    </div>
  );
};

Budgets.getLayout = (page) => {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default Budgets;
