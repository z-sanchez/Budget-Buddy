import { useState } from "react";
import DropdownIcon from "../../../../public/dropdown-icon.svg";
import { Collapse } from "@mui/material";
import { BLUE, MONTH_OPTIONS } from "../../../utils/constants";
import { BudgetStatusDetailed } from "./BudgetStatusDetailed";
import { useRouter } from "next/router";
import { useBudgets } from "../../../hooks/useBudgets";
import { ICON_MAP } from "../../../utils/iconMap";
import { type Budget } from "@prisma/client";

const BudgetsSection = ({
  activeMonth,
  month,
  onMonthChange,
}: {
  activeMonth:
    | {
        id: string;
        label: string;
        abbreviation: string;
      }
    | undefined;
  month: string;
  onMonthChange: (month: {
    id: string;
    label: string;
    abbreviation: string;
  }) => void;
}) => {
  const { getMonthsBudgets, createBudget } = useBudgets();
  const [expandSection, setExpandSection] = useState(true);

  const router = useRouter();

  const monthBudgets = getMonthsBudgets(activeMonth?.id ?? month);

  const goToEdit = async (budgetData: Budget) => {
    await router.push({
      pathname: `/budgets/${budgetData.id}`,
    });
  };

  const handleAddBudget = async () => {
    if (!activeMonth) return;
    await createBudget(activeMonth?.id)
      .then(async (result) => {
        if (!result) return;

        await router.push({
          pathname: `/budgets/${result.id}`,
        });
      })
      .catch(() => null);
  };

  const handleChangeMonth = (newMonth: {
    id: string;
    label: string;
    abbreviation: string;
  }) => {
    onMonthChange(newMonth);
  };

  return (
    <>
      <div className="flex w-full flex-row justify-between px-8">
        <div
          className="flex cursor-pointer items-center"
          onClick={() => setExpandSection((prev) => !prev)}
        >
          <DropdownIcon
            className={`${expandSection ? "" : "-rotate-90"} mr-3  transition`}
          />
          <p className="text-2xl font-light 2xl:text-3xl">March 2023</p>
        </div>
      </div>
      <Collapse in={expandSection}>
        <div className="flex flex-col">
          <div className="mx-16 mt-3 flex w-1/2 justify-between font-light 2xl:w-1/3 ">
            {MONTH_OPTIONS.map((monthOption) => {
              return (
                <button
                  className="blueOnHover hover:font-normal hover:underline"
                  style={
                    monthOption.id === activeMonth?.id
                      ? {
                          color: BLUE,
                          fontWeight: 400,
                          textDecoration: "underline",
                        }
                      : {}
                  }
                  onClick={() => handleChangeMonth(monthOption)}
                  key={monthOption.id}
                >
                  {monthOption.abbreviation}
                </button>
              );
            })}
          </div>
          <div className="mt-12 flex w-10/12 flex-wrap self-center">
            {monthBudgets?.map((budgetData) => {
              return (
                <BudgetStatusDetailed
                  key={budgetData.id}
                  budgetData={budgetData}
                  Icon={
                    ICON_MAP.find(({ id }) => id === budgetData.icon)?.Icon ||
                    ICON_MAP[0]?.Icon
                  }
                  onEdit={goToEdit}
                  className="my-5 mx-5 w-1/5 2xl:w-1/4"
                />
              );
            })}
          </div>
          <div className="flex w-10/12 justify-end self-center">
            <button
              onClick={() => {
                handleAddBudget().catch(() => null);
              }}
              className="text-sky-300 transition-all hover:text-sky-500"
            >
              Add Budget
            </button>
          </div>
        </div>
      </Collapse>
    </>
  );
};

export { BudgetsSection };
