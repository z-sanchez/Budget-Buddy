import DropdownIcon from "../../../../public/dropdown-icon.svg";
import { useState } from "react";
import { Collapse } from "@mui/material";
import { GREY, LIGHT_GREY } from "../../../utils/constants";

const IncomeSection = () => {
  const [expandSection, setExpandSection] = useState(false);

  return (
    <>
      <div className="my-4 flex w-full flex-row justify-between px-8">
        <div className="flex w-full items-center">
          <DropdownIcon
            className={`${
              expandSection ? "" : "-rotate-90"
            } mr-3 cursor-pointer transition`}
            onClick={() => setExpandSection((prev) => !prev)}
          />
          <p
            className="w-full border-x-0 border-y-0 border-b pb-1 text-2xl font-light 2xl:text-3xl"
            style={{ borderColor: LIGHT_GREY }}
          >
            Income Details
          </p>
        </div>
      </div>
      <Collapse in={expandSection}>Content goes here</Collapse>
    </>
  );
};

export { IncomeSection };
