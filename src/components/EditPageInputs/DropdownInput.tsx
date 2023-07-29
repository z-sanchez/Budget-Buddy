import { type DropdownOption } from "../../utils/types";
import { DropdownSelect } from "../DropdownSelect";

const DropdownInput = ({
  selectedOption,
  label,
  placeholder,
  options,
  handleUpdate,
  noPlaceholderOption,
}: {
  selectedOption: DropdownOption;
  handleUpdate: (value: any) => Promise<void> | void;
  noPlaceholderOption?: boolean;
  label: string;
  placeholder: string;
  options: DropdownOption[];
}) => {
  return (
    <div className="my-8 flex items-center">
      <p className="w-1/12 font-medium">{label}</p>
      <div className="flex w-2/12 items-center">
        <DropdownSelect
          placeholder={placeholder}
          value={selectedOption}
          noPlaceholderOption={noPlaceholderOption || false}
          options={options}
          onChange={(newvalue) => {
            handleUpdate(newvalue)?.catch((err) => console.log(err));
          }}
        />
      </div>
    </div>
  );
};

export { DropdownInput };
