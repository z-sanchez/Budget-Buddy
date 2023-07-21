import { LIGHT_GREY } from "../../utils/constants";
import { useState } from "react";

type Props = {
  value: string;
  handleUpdate: (newValue: any) => Promise<void>;
};

const ColorInput = ({ value, handleUpdate }: Props) => {
  const [color, setcolor] = useState(value);

  return (
    <div className="my-8 flex items-center">
      <p className="w-1/12 font-medium">Budget Name</p>
      <div className="flex w-2/12">
        <input
          onChange={(newValue) => {
            newValue ? setcolor(newValue.target.value) : null;
          }}
          onBlur={() => {
            handleUpdate(color).catch((err: string) => console.log({ err }));
          }}
          type="color"
          value={color}
          className="w-1/3 bg-transparent text-start"
          style={{
            outline: `1px solid ${LIGHT_GREY}`,
          }}
        ></input>
      </div>
    </div>
  );
};
export { ColorInput };
