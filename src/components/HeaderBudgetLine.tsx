import { GREY } from "../utils/constants";

const HeaderBudgetLine = ({
  amountColor,
  amount,
  budgetName,
}: {
  amountColor: string;
  amount: string;
  budgetName: string;
}) => {
  return (
    <p className="mr-5 text-lg 2xl:text-xl" style={{ color: GREY }}>
      {budgetName}:{" "}
      <span
        className="poppinsFont text-lg 2xl:text-xl "
        style={{ color: amountColor }}
      >
        ${amount}
      </span>
    </p>
  );
};

export { HeaderBudgetLine };
