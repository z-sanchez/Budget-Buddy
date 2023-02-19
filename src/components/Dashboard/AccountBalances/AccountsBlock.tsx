import EllipsisIcon from "../../../../public/ellipsis-icon.svg";
import { BLUE, GREY, RED } from "../../../utils/constants";
import { AccountBlock } from "./AccountBlock";

const AccountsBlock = () => {
  return (
    <div className="flex h-full w-full flex-col justify-start overflow-hidden px-8">
      <div className="flex w-full items-center justify-between">
        <p
          className="cursor-default text-xl font-light 2xl:text-2xl"
          style={{ color: GREY }}
        >
          Account Balances
        </p>
        <EllipsisIcon className="cursor-pointer"></EllipsisIcon>
      </div>
      <div className="mt-3 flex h-full flex-col justify-around">
        <AccountBlock color={RED} name={"Ziek's Account"} amount={1234.56} />
        <AccountBlock
          color={BLUE}
          name={"Chelsea's Account"}
          amount={1234.56}
        />
      </div>
    </div>
  );
};

export { AccountsBlock };
