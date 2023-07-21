import { LIGHT_GREY } from "../../utils/constants";
import { useState } from "react";

type Props = {
  value: string;
  handleUpdate: (newValue: any) => Promise<void>;
};

const TextInput = ({ value, handleUpdate }: Props) => {
  const [budgetName, setbudgetName] = useState(value);

  return (
    <div className="my-8 flex items-center">
      <p className="w-1/12 font-medium">Budget Name</p>
      <div className="flex w-2/12">
        <input
          onChange={(newValue) => {
            newValue ? setbudgetName(newValue.target.value) : null;
          }}
          onBlur={() => {
            handleUpdate(budgetName).catch((err: string) =>
              console.log({ err })
            );
          }}
          type="textfield"
          value={budgetName}
          className="w-full pl-3 text-start"
          placeholder="budget name"
          style={{
            outline: `1px solid ${LIGHT_GREY}`,
          }}
        ></input>
      </div>
    </div>
  );
};
export { TextInput };
