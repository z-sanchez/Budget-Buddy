import EllipsisIcon from "../../../../public/ellipsis-icon.svg";
import { GREY } from "../../../utils/constants";
import { AccountBlock } from "./AccountBlock";
import { type accounts } from "@prisma/client";

const AccountsBlock = ({ accounts }: { accounts: accounts[] }) => {
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
      <div className="mt-3 flex h-full flex-col justify-between">
        {accounts?.slice(0, 2).map((props) => {
          return (
            <AccountBlock
              {...props}
              amount={Number(props.amount)}
              key={props.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export { AccountsBlock };
