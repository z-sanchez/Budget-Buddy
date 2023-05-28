import { Breadcrumb } from "../../components/Breadcrumb";
import { PageHeader } from "../../components/PageHeader";
import NavigationLayout from "../../components/layouts/NavigationLayout";
import { type NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import { IconInput } from "../../components/EditBudget/IconInput";
import { ICON_MAP } from "../../utils/iconMap";
import { AmountInput } from "../../components/EditBudget/AmountInput";
import { DashboardInput } from "../../components/EditBudget/DashboardInput";
import { MonthInput } from "../../components/EditBudget/MonthInput";

const EditBudget: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <div className="col-span-1 grid h-screen min-h-[800px] grid-cols-[100%] grid-rows-[13%_auto] gap-y-2 px-5 py-3">
      <div className="col-span-1">
        <div className="flex h-full min-h-[120px] w-full flex-col justify-between overflow-hidden py-5">
          <PageHeader headerText={"Edit Budget"} />
          <Breadcrumb></Breadcrumb>
        </div>
      </div>
      <div className="col-span-1 pb-8">
        <div className="flex items-center">
          <p className="text-2xl font-light 2xl:text-3xl">{router.query.id}</p>
        </div>
        <MonthInput />
        <IconInput SelectedIcon={ICON_MAP[0]?.Icon} />
        <AmountInput />
        <DashboardInput />
      </div>
    </div>
  );
};

EditBudget.getLayout = (page) => {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default EditBudget;