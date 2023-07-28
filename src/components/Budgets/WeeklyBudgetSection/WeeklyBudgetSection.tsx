import { useState } from "react";
import DropdownIcon from "../../../../public/dropdown-icon.svg";
import { Collapse } from "@mui/material";
import {
  BLUE,
  GREEN_STATE,
  LIGHT_GREY,
  RED_STATE,
} from "../../../utils/constants";
import { BudgetLine } from "./BudgetLine";
import { getCurrentMonthsWeekDates } from "../../../utils/helpers/dayjs";

const WeeklyBudgetSection = () => {
  const [expandSection, setExpandSection] = useState(true);

  const dates = getCurrentMonthsWeekDates();

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
          <p
            className="w-full border-x-0 border-y-0 border-b pb-1 text-2xl font-light 2xl:text-3xl"
            style={{ borderColor: LIGHT_GREY }}
          >
            Weekly Spending
          </p>
        </div>
      </div>
      <div className="flex w-full justify-center px-3">
        <Collapse in={expandSection} className="w-full">
          {dates.map((date, index) => {
            const startDate = date.startDate.format("L LT");

            return (
              <BudgetLine key={startDate} {...date} weekNumber={index + 1} />
            );
          })}
        </Collapse>
      </div>
      <div className="mt-5 flex px-8">
        <p className="poppinsFont ml-8">
          Projected EOM Total: <span style={{ color: BLUE }}>$1934.56</span>{" "}
          <span style={{ color: GREEN_STATE }}> (+130)</span>
        </p>
        <p className="poppinsFont ml-8">
          Actual Total: <span style={{ color: BLUE }}>$1934.56</span>{" "}
          <span style={{ color: RED_STATE }}> (+130)</span>
        </p>
        <p className="poppinsFont ml-8">
          Spent: <span style={{ color: BLUE }}>$1934.56</span>{" "}
        </p>
      </div>
    </>
  );
};

export { WeeklyBudgetSection };
