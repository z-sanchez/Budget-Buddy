import { useState } from "react";
import { BLUE, GREEN, GREY, RED, YELLOW } from "../../../utils/constants";
import { type BudgetStatusProps } from "../../../utils/types";
import { type NextPageWithLayout } from "../../../pages/_app";
import DropdownIcon from "../../../../public/dropdown-icon.svg";
import { AccountsBlock } from "../../Dashboard/AccountBalances/AccountsBlock";
import { Collapse, TextField, Autocomplete } from "@mui/material";
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

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
  return (
    <>
      <div className="flex w-full flex-row justify-between px-8">
        <div className="flex items-center">
          <DropdownIcon
            className={`${
              expandSection ? "" : "-rotate-90"
            } mr-3 cursor-pointer transition`}
            onClick={() => setExpandSection((prev) => !prev)}
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
        <div className="mt-10">Content goes here</div>
      </Collapse>
    </>
  );
};

export { BudgetsSection };
