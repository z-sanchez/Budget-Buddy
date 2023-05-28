import { LIGHT_GREY } from "../../utils/constants";

const AmountInput = () => {
  return (
    <div className="my-8 flex items-center">
      <p className="w-1/12 font-medium">Amount</p>
      <div className="flex w-1/12">
        <span className="mr-2 ">$</span>{" "}
        <input
          type="number"
          value={0}
          min={0}
          className="w-2/3 text-end"
          placeholder="amount"
          style={{
            outline: `1px solid ${LIGHT_GREY}`,
          }}
        ></input>
      </div>
    </div>
  );
};
export { AmountInput };
