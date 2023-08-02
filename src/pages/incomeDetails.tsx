import { DashboardHeader } from "../components/DashboardHeader";
import NavigationLayout from "../components/layouts/NavigationLayout";
import { type NextPageWithLayout } from "./_app";
import { IncomeSection } from "../components/Budgets/IncomeSection/IncomeSection";

const IncomeDetails: NextPageWithLayout = () => {
  return (
    <div className="col-span-1 grid h-screen min-h-[800px] grid-cols-[100%] grid-rows-[13%_auto] gap-y-2 px-5 py-3">
      <div className="col-span-1">
        <DashboardHeader greeting={"Budgets"} totalBalance={""} />
      </div>
      <div className="col-span-1 pb-8">
        <IncomeSection />
      </div>
    </div>
  );
};

IncomeDetails.getLayout = (page) => {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default IncomeDetails;
