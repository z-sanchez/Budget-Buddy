import { GREEN_STATE, GREY, RED_STATE } from "../../../utils/constants";
import EllipsisIcon from "../../../../public/ellipsis-icon.svg";
import EditIcon from "../../../../public/edit-icon.svg";
import { type ThisWeeksTransactionsWithIcon } from "../../../utils/types";
import dayjs from "dayjs";

const WeeklySpendingTransactionLine = ({
  Icon,
  name,
  userName,
  date,
  amount,
}: ThisWeeksTransactionsWithIcon) => {
  const dateFormatted = dayjs(date).format("DD/MM/YYYY");
  const timeFormatted = dayjs(date).format("HH:MM");

  return (
    <div className="my-2 flex w-11/12 flex-row items-center justify-between xl:w-5/6">
      <div
        className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg outline outline-1 2xl:h-10 2xl:w-10"
        style={{ outlineColor: GREY }}
      >
        <Icon />
      </div>
      <div className="flex w-64 flex-col">
        <p className="2xl:text-xl ">{name}</p>
        <p className="poppinsFont  text-xs 2xl:text-sm" style={{ color: GREY }}>
          {dateFormatted} {timeFormatted} by {userName}
        </p>
      </div>
      <p
        className="poppinsFont 2xl:text-xl"
        style={{ color: amount < 0 ? RED_STATE : GREEN_STATE }}
      >
        {amount < 0 ? "-" : ""}${Math.abs(amount)}
      </p>
      <div className="flex">
        <EditIcon className="mr-5 h-5 w-5 cursor-pointer" />
        <EllipsisIcon className="cursor-pointer" />
      </div>
    </div>
  );
};

export { WeeklySpendingTransactionLine };
