import { useState } from "react";
import DropdownIcon from "../../../../public/dropdown-icon.svg";
import { Collapse, TextField, Autocomplete } from "@mui/material";
import { BLUE } from "../../../utils/constants";
import type { BudgetStatusDetailedProps } from "../../../utils/types";
import { BudgetStatusDetailed } from "./BudgetStatusDetailed";
import GarbageIcon from "../../../../public/trash-icon.svg";
import { useRouter } from "next/router";

const BudgetsSection = () => {
  const [expandSection, setExpandSection] = useState(true);
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

  const handleEditBudget = async (budgetName: string) => {
    await router.push(`/budgets/${budgetName}`);
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
        </div>
      </Collapse>
    </>
  );
};

export { BudgetsSection };
