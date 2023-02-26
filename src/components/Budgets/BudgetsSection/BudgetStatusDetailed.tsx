import { useState } from "react";
import { LinearProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GREY, LIGHT_GREY } from "../../../utils/constants";
import EditIcon from "../../../../public/edit-icon.svg";
import CloseIcon from "../../../../public/close-icon.svg";
import TargetIcon from "../../../../public/target-icon.svg";
import type { BudgetStatusDetailedProps } from "../../../utils/types";
import CalendarIcon from "../../../../public/calendar-icon.svg";
import { DateModal } from "./DateModal";

const BudgetStatusDetailed = ({
  budgetAmount,
  budgetBalance,
  color,
  name,
  message,
  // accounts,
  longTerm,
  className,
}: BudgetStatusDetailedProps) => {
  const [edit, setEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const percentage = (100 / budgetAmount) * budgetBalance;

  const theme = createTheme({
    components: {
      MuiLinearProgress: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.variant === "determinate" &&
              ownerState.color === "primary" && {
                backgroundColor: LIGHT_GREY,
                borderRadius: "2rem",
                height: "7px",
              }),
          }),
          bar1Determinate: {
            backgroundColor: color,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div
        className={`relative h-fit cursor-default ${
          className ? className : "w-2/5"
        }`}
      >
        <DateModal modalOpen={modalOpen} onClose={() => setModalOpen(false)} />
        {edit && (
          <CloseIcon
            className="absolute h-3 w-3 cursor-pointer"
            style={{ right: "100%", bottom: "95%" }}
            onClick={() => setEdit(false)}
          />
        )}
        {longTerm && !edit && (
          <TargetIcon
            className="absolute h-3 w-3 "
            style={{ right: "100%", bottom: "95%" }}
          />
        )}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center">
            {!edit ? (
              <>
                <p className="2xl:text-xl">{name}</p>
                <EditIcon
                  className="ml-3 h-3 w-3 cursor-pointer"
                  style={{ fill: GREY }}
                  onClick={() => setEdit(true)}
                />
              </>
            ) : (
              <input
                type="text"
                className="2xl:text-xl"
                value={name}
                placeholder="Budget Name"
              ></input>
            )}
          </div>
          <p
            className="poppinsFont text-sm font-light 2xl:text-base"
            style={{ color: GREY }}
          >
            {budgetBalance} / {budgetAmount}
          </p>
        </div>
        <LinearProgress
          className=""
          color="primary"
          value={percentage}
          variant="determinate"
        ></LinearProgress>
        {!edit ? (
          <p
            style={{ color: LIGHT_GREY }}
            className="poppinsFont mt-2 text-xs font-light"
          >
            {message}
          </p>
        ) : (
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center">
              <p style={{ color: LIGHT_GREY }} className="text-xs font-light">
                set dates:
              </p>
              <CalendarIcon
                className="ml-2 h-4 w-4 cursor-pointer"
                onClick={() => setModalOpen(true)}
              ></CalendarIcon>
            </div>
            <div className="flex items-center">
              <label
                htmlFor="dashboard-checkbox"
                className="mr-3 text-xs font-light"
                style={{ color: LIGHT_GREY }}
              >
                Dashboard
              </label>
              <input name="dashboard-checkbox" type="checkbox" />
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export { BudgetStatusDetailed };
