import { useState } from "react";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import CalendarIcon from "../../../public/calendar-icon.svg";
import type { ElementType } from "react";
import dayjs from "dayjs";

const DateInput = ({
  value,
  label,
  handleUpdate,
}: {
  value: string;
  handleUpdate: (value: any) => Promise<void> | void;
  noPlaceholderOption?: boolean;
  label: string;
}) => {
  const [dateOpen, setDateOpen] = useState<string | boolean>(false);
  return (
    <div className="my-8 flex items-center">
      <p className="font-medium lg:w-2/12">{label}</p>
      <div className="flex items-center lg:w-1/5">
        <DesktopDateTimePicker
          renderInput={({ inputRef }) => (
            <div ref={inputRef}>
              <CalendarIcon
                className="mr-5 h-7 w-7 cursor-pointer"
                onClick={() => setDateOpen((prev) => !prev)}
              />
            </div>
          )}
          value={value}
          disableFuture
          onChange={(newValue) => {
            setDateOpen(newValue || "");
            handleUpdate(newValue)?.catch((err) => console.log(err));
          }}
          onClose={() => setDateOpen(false)}
          open={Boolean(dateOpen)}
          components={{
            OpenPickerIcon: CalendarIcon as ElementType,
          }}
        />
        <p className="">{dayjs(value).format("L LT")}</p>
      </div>
    </div>
  );
};

export { DateInput };
