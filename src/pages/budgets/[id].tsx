import { Breadcrumb } from "../../components/Breadcrumb";
import { PageHeader } from "../../components/PageHeader";
import NavigationLayout from "../../components/layouts/NavigationLayout";
import { type NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import { IconInput } from "../../components/EditBudget/IconInput";
import { ICON_MAP } from "../../utils/iconMap";
import { DollarInput } from "../../components/EditBudget/DollarInput";
import { DashboardInput } from "../../components/EditBudget/DashboardInput";
import { useBudgets } from "../../hooks/useBudgets";
import { Prisma, type Budget } from "@prisma/client";
import { MONTH_OPTIONS } from "../../utils/constants";
import { type DropdownOption } from "../../utils/types";
import { ColorInput } from "../../components/EditBudget/ColorInput";
import { TextInput } from "../../components/EditPageInputs/TextInput";
import { DropdownInput } from "../../components/EditPageInputs/DropdownInput";

type PartialBudget = Partial<Budget>;

const EditBudget: NextPageWithLayout = () => {
  const router = useRouter();
  const { updateMonthsBudget, getBudgetData, deleteBudget } = useBudgets();

  const budgetId = router.query.id as string;

  const budgetData = getBudgetData(budgetId) as Budget;

  const handleUpdateBudget = async (
    updatedValues: PartialBudget
  ): Promise<void> => {
    await updateMonthsBudget({ ...budgetData, ...updatedValues });
  };

  const handleDeleteBudget = async (): Promise<void> => {
    await deleteBudget(budgetData?.id)
      .then(async () => {
        await router.push("/budgets");
      })
      .catch(() => console.log("error"));
  };

  const selectedMonth = MONTH_OPTIONS?.find(
    ({ id }) => id === String(budgetData?.month)
  ) || { label: "January", id: "0" };

  return !budgetData?.name ? null : (
    <div className="col-span-1 grid h-screen min-h-[800px] grid-cols-[100%] grid-rows-[13%_auto] gap-y-2 px-5 py-3">
      <div className="col-span-1">
        <div className="flex h-full min-h-[120px] w-full flex-col justify-between overflow-hidden py-5">
          <PageHeader headerText={"Edit Budget"} />
          <Breadcrumb></Breadcrumb>
        </div>
      </div>
      <div className="col-span-1 pb-8">
        <div className="flex items-center">
          <p className="text-2xl font-light 2xl:text-3xl">{budgetData?.name}</p>
        </div>

        <TextInput
          value={budgetData.name}
          label="Budget Name"
          placeholder="Budget Name"
          handleUpdate={(newValue: string) =>
            handleUpdateBudget({ name: newValue })
          }
        ></TextInput>

        <DropdownInput
          selectedOption={selectedMonth}
          noPlaceholderOption={true}
          handleUpdate={(newValue: DropdownOption) =>
            handleUpdateBudget({ month: Number(newValue?.id) })
          }
          options={MONTH_OPTIONS}
          label="Month"
          placeholder="Month"
        />

        <IconInput
          SelectedIcon={
            ICON_MAP.find(({ id }) => id === budgetData?.icon)?.Icon ??
            ICON_MAP[0]?.Icon
          }
          handleUpdate={(newIconId: string) =>
            handleUpdateBudget({
              icon: newIconId,
            })
          }
        />
        <DollarInput
          value={budgetData?.amount}
          label="amount"
          handleUpdate={(newValue: number) =>
            handleUpdateBudget({
              amount: new Prisma.Decimal(newValue),
            })
          }
        />
        <DollarInput
          label="balance"
          value={budgetData?.balance}
          handleUpdate={(newValue: number) =>
            handleUpdateBudget({
              balance: new Prisma.Decimal(newValue),
            })
          }
        />
        <ColorInput
          value={budgetData?.color}
          handleUpdate={(newValue: string) =>
            handleUpdateBudget({ color: newValue })
          }
        />
        <DashboardInput
          checked={budgetData?.dashboard || 0}
          handleUpdate={(newValue: number) =>
            handleUpdateBudget({
              dashboard: newValue,
            })
          }
        />
        <button
          className="text-red-400 transition-all hover:text-red-600"
          onClick={() => {
            void handleDeleteBudget();
          }}
        >
          Delete Budget
        </button>
      </div>
    </div>
  );
};

EditBudget.getLayout = (page) => {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default EditBudget;
