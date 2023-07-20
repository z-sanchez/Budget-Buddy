import { useContext, useState } from "react";
import DropdownIcon from "../../../../public/dropdown-icon.svg";
import { Collapse, TextField, Autocomplete } from "@mui/material";
import { BLUE, MONTH_OPTIONS } from "../../../utils/constants";
import { BudgetStatusDetailed } from "./BudgetStatusDetailed";
import { useRouter } from "next/router";
import { DateContext } from "../../../state/dateContext";
import { useBudgets } from "../../../hooks/useBudgets";
import { ICON_MAP } from "../../../utils/iconMap";
import { type Budget } from "@prisma/client";

const BudgetsSection = () => {
  const { getMonthsBudgets } = useBudgets();
  const [expandSection, setExpandSection] = useState(true);
  const { month } = useContext(DateContext);
  const [activeMonth, setActiveMonth] = useState(() =>
    MONTH_OPTIONS.find(({ id }) => id === month)
  );
  const router = useRouter();

  const monthBudgets = getMonthsBudgets(activeMonth?.id ?? month);

  const testBudgetName = [
    { label: "Dativity" },
    { label: "Grocery" },
    { label: "Ziek" },
    { label: "Chelsea" },
    { label: "Gas" },
    { label: "Loans" },
  ];

  const goToEdit = async (budgetName: string, budget: Budget) => {
    await router.push({
      pathname: `/budgets/${budgetName}`,
      query: {
        ...budget,
        amount: Number(budget.amount),
        balance: Number(budget.balance),
      },
    });
  };

  const handleAddBudget = () => {
    router.push(`/budgets/new budget`).catch((err) => console.log(err));
  };

  const handleChangeMonth = (newMonth: {
    id: string;
    label: string;
    abbreviation: string;
  }) => {
    setActiveMonth(newMonth);
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
        <Autocomplete
          disablePortal
          id="search-budgets"
          options={testBudgetName}
          sx={{ width: 200 }}
          renderInput={(params) => (
            <TextField
              {...params}
              hiddenLabel
              size="small"
              placeholder="Search Budgets"
            />
          )}
        />
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
          <div className="mt-5 flex w-10/12 flex-wrap justify-between self-center">
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
                  className="my-5 mx-5 w-2/5 2xl:w-1/4"
                />
              );
            })}
          </div>
          <div className="flex w-10/12 justify-end self-center">
            <button
              onClick={handleAddBudget}
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
