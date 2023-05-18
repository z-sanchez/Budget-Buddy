import { useState } from "react";
import { Collapse } from "@mui/material";
import { BLUE, GREEN_STATE, LIGHT_GREY } from "../../../utils/constants";

import DropdownIcon from "../../../../public/dropdown-icon.svg";
import { TransactionBlock } from "./TransactionBlock";

const BudgetLine = () => {
  const [expandSection, setExpandSection] = useState(true);

  return (
    <>
      <div
        className="my-4 flex w-full cursor-pointer justify-between px-8"
        onClick={() => setExpandSection((prev) => !prev)}
      >
        <div className="flex w-full items-center">
          <DropdownIcon
            className={`${
              expandSection ? "" : "-rotate-90"
            } mr-3 cursor-pointer transition`}
          />
          <div className="flex w-full items-center border-x-0 border-y-0 border-b pb-1">
            <p
              className=" text-xl font-light 2xl:text-2xl"
              style={{ borderColor: LIGHT_GREY }}
            >
              Week 1 - 3/1 - 3/7
            </p>
            <p className="poppinsFont ml-8">
              Projected Total: <span style={{ color: BLUE }}>$1934.56</span>{" "}
              <span style={{ color: GREEN_STATE }}> (+130)</span>
            </p>
          </div>
        </div>
      </div>
      <Collapse in={expandSection} className="mx-auto w-11/12">
        <TransactionBlock blockName="Budgeted Transactions" />
        <TransactionBlock blockName="Transactions" />
      </Collapse>
    </>
  );
};

export { BudgetLine };
