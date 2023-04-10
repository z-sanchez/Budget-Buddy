import { GREEN_STATE, GREY, RED_STATE } from "../../../utils/constants";
import TrashIcon from "../../../../public/trash-icon.svg";
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
  const dateFormatted = dayjs(date).format("L LT");

  return (
    <div className="my-2 flex w-full flex-row items-center justify-between px-2 lg:w-11/12">
      <div className="flex w-8/12 items-center">
        <div
          className="mr-5 flex items-center justify-center rounded-lg p-1 outline outline-1"
          style={{ outlineColor: GREY }}
        >
          <Icon />
        </div>
        <div className="flex flex-col">
          <p className="truncate">{name}</p>
          <p className="poppinsFont truncate" style={{ color: GREY }}>
            {dateFormatted} by {userName}
          </p>
        </div>
      </div>
      <p
        className="poppinsFont "
        style={{ color: amount < 0 ? RED_STATE : GREEN_STATE }}
      >
        {amount < 0 ? "-" : ""}${Math.abs(amount)}
      </p>
      <div className="flex w-1/12 items-center justify-between">
        <EditIcon className="icon--hoverGreen w-5 cursor-pointer transition-colors" />
        <TrashIcon className="icon--hoverRed w-5 cursor-pointer transition-colors" />
      </div>
    </div>
  );
};

export { WeeklySpendingTransactionLine };
