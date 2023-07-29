import { LIGHT_GREY } from "../../utils/constants";
import { useState } from "react";

type Props = {
  value: string;
  label: string;
  placeholder: string;
  handleUpdate: (newValue: any) => Promise<void> | void;
};

const TextInput = ({ value, label, placeholder, handleUpdate }: Props) => {
  const [text, setText] = useState(value);

  return (
    <div className="my-8 flex items-center">
      <p className="w-1/12 font-medium">{label}</p>
      <div className="flex w-2/12">
        <input
          onChange={(newValue) => {
            newValue ? setText(newValue.target.value) : null;
          }}
          onBlur={() => {
            handleUpdate(text)?.catch((err: string) => console.log({ err }));
          }}
          type="textfield"
          value={text}
          className="w-full pl-3 text-start"
          placeholder={placeholder}
          style={{
            outline: `1px solid ${LIGHT_GREY}`,
          }}
        ></input>
      </div>
    </div>
  );
};
export { TextInput };
