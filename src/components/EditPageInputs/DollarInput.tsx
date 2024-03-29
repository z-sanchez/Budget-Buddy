import { type Decimal } from "@prisma/client/runtime";
import { LIGHT_GREY } from "../../utils/constants";
import { useState } from "react";
import { Prisma } from "@prisma/client";

type Props = {
  value: Decimal;
  label: string;
  placeholder: string;
  handleUpdate: (value: any) => Promise<void> | void;
};

const DollarInput = ({ value, label, placeholder, handleUpdate }: Props) => {
  const [amount, setAmount] = useState(value);

  return (
    <div className="my-8 flex items-center">
      <p className="w-2/12 font-medium">{label}</p>
      <div className="flex w-1/12">
        <span className="mr-2 ">$</span>{" "}
        <input
          onChange={(newValue) => {
            newValue
              ? setAmount(new Prisma.Decimal(newValue.target.value))
              : null;
          }}
          onBlur={() => {
            handleUpdate(amount)?.catch((err: string) => console.log({ err }));
          }}
          type="number"
          value={Number(amount)}
          className="w-2/3 text-end"
          placeholder={placeholder}
          style={{
            outline: `1px solid ${LIGHT_GREY}`,
          }}
        ></input>
      </div>
    </div>
  );
};
export { DollarInput };
