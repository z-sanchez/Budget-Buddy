import { LinearProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GREY, LIGHT_GREY } from "../../../utils/constants";
import EditIcon from "../../../../public/edit-icon.svg";
import TargetIcon from "../../../../public/target-icon.svg";
import type { BudgetStatusDetailedProps } from "../../../utils/types";

const getThemeWithBackgroundColor = (backgroundColor: string) => {
  return createTheme({
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
            backgroundColor: backgroundColor,
          },
        },
      },
    },
  });
};

const BudgetStatusDetailed = ({
  Icon,
  budgetAmount,
  budgetBalance,
  color,
  name,
  message,
  longTerm,
  className,
  onEdit,
}: BudgetStatusDetailedProps & {
  Icon: string;
  onEdit: (budgetName: string) => Promise<void>;
}) => {
  const percentage = (100 / budgetAmount) * budgetBalance;

  const theme = getThemeWithBackgroundColor(color);

  return (
    <ThemeProvider theme={theme}>
      <div
        className={`relative h-fit cursor-default ${
          className ? className : "w-2/5"
        }`}
      >
        {longTerm && (
          <TargetIcon
            className="absolute h-3 w-3 "
            style={{ right: "100%", bottom: "95%" }}
          />
        )}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center">
            <>
              <span className="mr-3">
                <Icon />
              </span>
              <p className="2xl:text-xl">{name}</p>
              <EditIcon
                className="ml-3 h-3 w-3 cursor-pointer"
                style={{ fill: GREY }}
                onClick={() => onEdit(name)}
              />
            </>
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
        <p
          style={{ color: GREY }}
          className="poppinsFont mt-2 text-xs font-light"
        >
          {message}
        </p>
      </div>
    </ThemeProvider>
  );
};

export { BudgetStatusDetailed };
