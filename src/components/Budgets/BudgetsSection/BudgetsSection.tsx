import { useState } from "react";
import DropdownIcon from "../../../../public/dropdown-icon.svg";
import { Collapse, TextField, Autocomplete } from "@mui/material";
import { BLUE } from "../../../utils/constants";
import type { BudgetStatusDetailedProps } from "../../../utils/types";
import { BudgetStatusDetailed } from "./BudgetStatusDetailed";

const BudgetsSection = () => {
  const [expandSection, setExpandSection] = useState(true);

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
    accounts: [...accounts],
    longTerm: true,
  };

  const monthLinks = [
    {
      month: "Jan",
      active: false,
    },
    {
      month: "Feb",
      active: false,
    },
    {
      month: "Mar",
      active: true,
    },
    {
      month: "Apr",
      active: false,
    },
    {
      month: "May",
      active: false,
    },
    {
      month: "Jun",
      active: false,
    },
    {
      month: "Jul",
      active: false,
    },
    {
      month: "Aug",
      active: false,
    },
    {
      month: "Sep",
      active: false,
    },
    {
      month: "Oct",
      active: false,
    },
    {
      month: "Nov",
      active: false,
    },
    {
      month: "Dec",
      active: false,
    },
  ];

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
        <div>
          <div className="mx-16 mt-3 flex w-1/3 justify-between font-light">
            {monthLinks.map(({ month, active }) => {
              return (
                <button
                  className="blueOnHover hover:font-normal hover:underline"
                  style={
                    active
                      ? {
                          color: BLUE,
                          fontWeight: 400,
                          textDecoration: "underline",
                        }
                      : {}
                  }
                  key={month}
                >
                  {month}
                </button>
              );
            })}
          </div>
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
        </div>
      </Collapse>
    </>
  );
};

export { BudgetsSection };
