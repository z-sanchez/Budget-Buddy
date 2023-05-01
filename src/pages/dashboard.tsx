import { DashboardHeader } from "../components/DashboardHeader";
import NavigationLayout from "../components/layouts/NavigationLayout";
import { LineGraph } from "../components/Dashboard/LineGraph/LineGraph";
import { LongTermGoals } from "../components/Dashboard/LongTermGoals/LongTermGoals";
import { RecentActivity } from "../components/Dashboard/RecentActivity/RecentActivity";
import { WeeklySpendingBlock } from "../components/Dashboard/WeeklySpending/WeeklySpendingBlock";
import { type NextPageWithLayout } from "./_app";
import { AccountsBlock } from "../components/Dashboard/AccountBalances/AccountsBlock";
import { api } from "../utils/api";
import type { accounts, budgets, LongTerm, users } from "@prisma/client";
import { createWeekBudgetSpendingLineGraphData } from "../utils/helpers/lineGraph";
import { useTransactions } from "../hooks/useTransactions";

const Dashboard: NextPageWithLayout = () => {
  const {
    thisWeeksTransactions,
    transactionsWithIcon,
    addTransactions,
    deleteTransaction,
    editTransaction,
  } = useTransactions();

  const budgets = api.budgets.getAllBudgets.useQuery().data as budgets[];

  const users = api.user.getAllAccountUsers.useQuery().data as users[];

  const accounts = api.accounts.getAllAccounts.useQuery().data as accounts[];

  const dashboardAccounts = accounts?.filter(({ dashboard }) => dashboard);

  const longTermGoalsData = api.budgets.getAllLongTermBudgets.useQuery()
    .data as LongTerm[];

  const lineGraphdata = createWeekBudgetSpendingLineGraphData({
    budgets: budgets?.filter(({ dashboard }) => dashboard),
    transactions: thisWeeksTransactions?.filter(({ amount }) => amount < 0),
  });

  const budgetOptions = budgets?.map(({ name, id }) => {
    return {
      label: name,
      id,
    };
  });

  const accountOptions = accounts?.map(({ name, id }) => {
    return {
      label: name,
      id,
    };
  });

  const userOptions = users?.map(({ name, id }) => {
    return {
      label: name,
      id,
    };
  });

  return (
    <div className="col-span-1 grid h-screen min-h-[800px] grid-cols-[50%_50%] grid-rows-[13%_25%_auto_25%] gap-y-2 px-5 py-3 pb-8">
      <div className="col-span-2">
        <DashboardHeader greeting="Good Evening, Ziek!" />
      </div>
      <div className="col-span-1 ">
        <WeeklySpendingBlock
          budgetStatusData={budgets?.filter(({ dashboard }) => dashboard)}
        />
      </div>
      <div className="col-span-1">
        <LongTermGoals
          longTermGoalData={longTermGoalsData?.filter(
            ({ dashboard }) => dashboard
          )}
        />
      </div>
      <div className="col-span-2">
        <LineGraph data={lineGraphdata} />
      </div>
      <div className="col-span-1">
        <RecentActivity
          handleAddTransactions={addTransactions}
          handleDeleteTransaction={deleteTransaction}
          handleEditTransaction={editTransaction}
          data={transactionsWithIcon}
          budgets={budgetOptions}
          accounts={accountOptions}
          users={userOptions}
        />
      </div>
      <div className="col-span-1">
        <AccountsBlock accounts={dashboardAccounts} />
      </div>
    </div>
  );
};

Dashboard.getLayout = (page) => {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default Dashboard;
