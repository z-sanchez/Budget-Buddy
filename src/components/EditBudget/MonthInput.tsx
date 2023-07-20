import { MONTH_OPTIONS } from "../../utils/constants";
import { type DropdownOption } from "../../utils/types";
import { DropdownSelect } from "../DropdownSelect";

const MonthInput = ({
  selectedOption,
  handleUpdate,
}: {
  selectedOption: DropdownOption;
  handleUpdate: (value: any) => Promise<void>;
}) => {
  return (
    <div className="my-8 flex items-center">
      <p className="w-1/12 font-medium">Month</p>
      <div className="flex w-2/12 items-center">
        <DropdownSelect
          placeholder="month"
          value={selectedOption}
          options={MONTH_OPTIONS}
          onChange={(newvalue) => {
            handleUpdate(newvalue).catch((err) => console.log(err));
          }}
        />
      </div>
    </div>
  );
};

export { MonthInput };
