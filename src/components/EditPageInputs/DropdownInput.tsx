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
      <p className="font-medium lg:w-2/12">{label}</p>
      <div className="flex items-center lg:w-1/5">
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
