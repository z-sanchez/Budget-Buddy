import { useState } from "react";
import DropdownIcon from "../../../../public/dropdown-icon.svg";
import { Collapse, TextField, Autocomplete } from "@mui/material";
import { BudgetStatus } from "../../BudgetStatus";
import { BLUE, GREEN, RED, YELLOW } from "../../../utils/constants";
import type {
  BudgetStatusDetailedProps,
  BudgetStatusProps,
} from "../../../utils/types";
import { BudgetStatusDetailed } from "./BudgetStatusDetailed";

const BudgetsSection = () => {
  const [expandSection, setExpandSection] = useState(false);

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
      id: 1,
      accountName: "Wells Fargo 1",
    },
    {
      id: 2,
      accountName: "Wells Fargo 2",
    },
    {
      id: 3,
      accountName: "Bofa",
    },
    {
      id: 4,
      accountName: "Bella's Wells Fargo",
    },
  ];

  const budgetStatusData: BudgetStatusDetailedProps = {
    color: BLUE,
    budgetAmount: 150,
    name: "Dativity",
    budgetBalance: 20,
    message: "Next Payment: $40 due April 4th, 2023",
    edit: false,
    accounts: [...accounts],
    longTerm: true,
  };

  return (
    <>
      <div className="flex w-full flex-row justify-between px-8 ">
        <div
          className="flex cursor-pointer items-center"
          onClick={() => setExpandSection((prev) => !prev)}
        >
          <DropdownIcon
            className={`${expandSection ? "" : "-rotate-90"} mr-3  transition`}
          />
          <p className=" text-2xl font-light 2xl:text-3xl">March 2023</p>
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
        <div className="mt-5 flex w-full flex-wrap justify-center px-14">
          <BudgetStatusDetailed
            {...budgetStatusData}
            className="mx-8 my-5 w-1/4"
          />
          <BudgetStatusDetailed
            {...budgetStatusData}
            className="mx-8 my-5 w-1/4"
          />
          <BudgetStatusDetailed
            {...budgetStatusData}
            className="mx-8 my-5 w-1/4"
          />
          <BudgetStatusDetailed
            {...budgetStatusData}
            className="mx-8 my-5 w-1/4"
          />
          <BudgetStatusDetailed
            {...budgetStatusData}
            className="mx-8 my-5 w-1/4"
          />
          <BudgetStatusDetailed
            {...budgetStatusData}
            className="mx-8 my-5 w-1/4"
          />
        </div>
      </Collapse>
    </>
  );
};

export { BudgetsSection };
