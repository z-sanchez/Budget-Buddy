import { LinearProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GREY, LIGHT_GREY, RED_STATE } from "../utils/constants";
import { type BudgetStatusProps } from "../utils/types";

const BudgetStatus = ({
  amount,
  balance,
  color,
  name,
  className,
}: BudgetStatusProps) => {
  const overBudget = Number(balance) > Number(amount);

  const percentage = !overBudget
    ? (100 / Number(amount)) * (Number(amount) - Number(balance))
    : 100;

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
                outline: overBudget ? `2px solid ${RED_STATE}` : "",
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
        className={` h-fit cursor-pointer ${className ? className : "w-2/5"}`}
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="2xl:text-xl">{name}</p>
          <p
            className="poppinsFont text-sm font-light 2xl:text-base"
            style={{ color: !overBudget ? GREY : RED_STATE }}
          >
            {balance} / {amount}
          </p>
        </div>
        <LinearProgress
          className=""
          color="primary"
          value={percentage}
          variant="determinate"
        ></LinearProgress>
      </div>
    </ThemeProvider>
  );
};

export { BudgetStatus };
