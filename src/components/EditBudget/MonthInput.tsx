import { MONTH_OPTIONS } from "../../utils/constants";
import { DropdownSelect } from "../DropdownSelect";

const MonthInput = () => {
  return (
    <div className="my-8 flex items-center">
      <p className="w-1/12 font-medium">Month</p>
      <div className="flex w-2/12 items-center">
        <DropdownSelect
          placeholder="month"
          value={{ id: 1, label: "January" }}
          options={MONTH_OPTIONS}
          onChange={() => null}
        />
      </div>
    </div>
  );
};

export { MonthInput };
