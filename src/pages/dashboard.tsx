import { DashboardHeader } from "../components/DashboardHeader";
import NavigationLayout from "../components/layouts/NavigationLayout";
import { LineGraph } from "../components/Dashboard/LineGraph/LineGraph";
import { LongTermGoals } from "../components/Dashboard/LongTermGoals/LongTermGoals";
import { RecentActivity } from "../components/Dashboard/RecentActivity/RecentActivity";
import { WeeklySpendingBlock } from "../components/Dashboard/WeeklySpending/WeeklySpendingBlock";
import { YELLOW } from "../utils/constants";
import { type NextPageWithLayout } from "./_app";
import ShoppingIcon from "../../public/shopping-icon.svg";
import { AccountsBlock } from "../components/Dashboard/AccountBalances/AccountsBlock";
import { api } from "../utils/api";
import type { budgets, longTerm } from "@prisma/client";

const Dashboard: NextPageWithLayout = () => {
  const budgets = api.budgets.getAllBudgets.useQuery().data as budgets[];

  const longTermGoalsData = api.budgets.getAllLongTermBudgets.useQuery()
    .data as longTerm[];

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dativity",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#82E460",
        tension: 0.4,
      },
      {
        label: "Gas",
        data: [55, 81, 60, 56, 65, 59, 65],
        fill: false,
        borderColor: "#FF577F",
        tension: 0.4,
      },
      {
        label: "Grocery",
        data: [39, 81, 34, 56, 61, 59, 28],
        fill: false,
        borderColor: "#00B8FF",
        tension: 0.4,
      },
      {
        label: "Ziek Allowance",
        data: [22, 43, 36, 56, 89, 34, 14],
        fill: false,
        borderColor: YELLOW,
        tension: 0.4,
      },
    ],
  };

  const testTransactions = [
    {
      Icon: ShoppingIcon as string,
      transactionName: "Stuff",
      transactionDate: "01/20/2000",
      transactionTime: "4:20 pm",
      transactionUser: "Ziek",
      transactionAmount: 22,
    },
    {
      Icon: ShoppingIcon as string,
      transactionName: "Stuff",
      transactionDate: "02/04/2033",
      transactionTime: "5:57 am",
      transactionUser: "Chelsea",
      transactionAmount: -30,
    },
    {
      Icon: ShoppingIcon as string,
      transactionName: "Stuff",
      transactionDate: "01/20/2000",
      transactionTime: "4:20 pm",
      transactionUser: "Ziek",
      transactionAmount: 22,
    },
    {
      Icon: ShoppingIcon as string,
      transactionName: "Stuff",
      transactionDate: "02/04/2033",
      transactionTime: "5:57 am",
      transactionUser: "Chelsea",
      transactionAmount: -30,
    },
  ];

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
        <LongTermGoals longTermGoalData={longTermGoalsData} />
      </div>
      <div className="col-span-2">
        <LineGraph data={data} />
      </div>
      <div className="col-span-1">
        <RecentActivity data={testTransactions} />
      </div>
      <div className="col-span-1">
        <AccountsBlock />
      </div>
    </div>
  );
};

Dashboard.getLayout = (page) => {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default Dashboard;
