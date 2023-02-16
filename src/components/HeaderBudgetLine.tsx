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
    <p className="mr-5 text-xl" style={{ color: GREY }}>
      {budgetName}:{" "}
      <span className="poppinsFont text-2xl " style={{ color: amountColor }}>
        ${amount}
      </span>
    </p>
  );
};

export { HeaderBudgetLine };
