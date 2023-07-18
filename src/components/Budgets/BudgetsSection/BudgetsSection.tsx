import { useContext, useState } from "react";
import DropdownIcon from "../../../../public/dropdown-icon.svg";
import { Collapse, TextField, Autocomplete } from "@mui/material";
import { BLUE, MONTH_OPTIONS } from "../../../utils/constants";
import type { BudgetStatusDetailedProps } from "../../../utils/types";
import { BudgetStatusDetailed } from "./BudgetStatusDetailed";
import GarbageIcon from "../../../../public/trash-icon.svg";
import { useRouter } from "next/router";
import { DateContext } from "../../../state/dateContext";

const BudgetsSection = () => {
  const [expandSection, setExpandSection] = useState(true);
  const { month } = useContext(DateContext);
  const [activeMonth, setActiveMonth] = useState(() =>
    MONTH_OPTIONS.find(({ id }) => id === month)
  );
  const router = useRouter();

  const testBudgetName = [
    { label: "Dativity" },
    { label: "Grocery" },
    { label: "Ziek" },
    { label: "Chelsea" },
    { label: "Gas" },
    { label: "Loans" },
  ];

  const accounts = [
    {
      id: "1",
      accountName: "Wells Fargo 1",
    },
    {
      id: "2",
      accountName: "Wells Fargo 2",
    },
    {
      id: "3",
      accountName: "Bofa",
    },
    {
      id: "4",
      accountName: "Bella's Wells Fargo",
    },
  ];

  const budgetStatusData: BudgetStatusDetailedProps & { Icon: string } = {
    color: BLUE,
    budgetAmount: 150,
    name: "Bussy Money",
    budgetBalance: 20,
    message: "Next Payment: $40 due April 4th, 2023",
    accounts: [...accounts],
    longTerm: true,
    Icon: GarbageIcon as string,
  };

  const handleEditBudget = async (budgetName: string) => {
    await router.push(`/budgets/${budgetName}`);
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
            <BudgetStatusDetailed
              {...budgetStatusData}
              onEdit={handleEditBudget}
              className="my-5 mx-5 w-2/5 2xl:w-1/4"
            />
            <BudgetStatusDetailed
              {...budgetStatusData}
              onEdit={handleEditBudget}
              className="my-5 mx-5 w-2/5 2xl:w-1/4"
            />
            <BudgetStatusDetailed
              {...budgetStatusData}
              onEdit={handleEditBudget}
              className="my-5 mx-5 w-2/5 2xl:w-1/4"
            />
            <BudgetStatusDetailed
              {...budgetStatusData}
              onEdit={handleEditBudget}
              className="my-5 mx-5 w-2/5 2xl:w-1/4"
            />
            <BudgetStatusDetailed
              {...budgetStatusData}
              onEdit={handleEditBudget}
              className="my-5 mx-5 w-2/5 2xl:w-1/4"
            />
            <BudgetStatusDetailed
              {...budgetStatusData}
              onEdit={handleEditBudget}
              className="my-5 mx-5 w-2/5 2xl:w-1/4"
            />
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
