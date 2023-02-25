import CalendarIcon from "../../../../public/calendar-icon.svg";
import { useState } from "react";
import { MenuItem, Select, styled, TableCell } from "@mui/material";
import { LIGHT_GREY } from "../../../utils/constants";
import { TableRow } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import type { ElementType } from "react";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
    border: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    border: "none",
  },
}));

const IncomeRow = ({
  incomeName,
  incomeAmount,
  accounts,
}: {
  incomeName: string;
  incomeAmount: number;
  accounts: { id: number; accountName: string }[];
}) => {
  const [dateOpen, setDateOpen] = useState(false);

  return (
    <TableRow>
      <StyledTableCell
        className="cursor-pointer text-lg font-thin"
        align="center"
      >
        {incomeName}
      </StyledTableCell>
      <StyledTableCell align="center">
        <div className="flex w-full cursor-pointer justify-center ">
          <DesktopDatePicker
            renderInput={({ inputRef }) => (
              <div ref={inputRef}>
                <CalendarIcon onClick={() => setDateOpen((prev) => !prev)} />
              </div>
            )}
            value={null}
            onChange={(newValue) => {
              console.log(newValue);
            }}
            onClose={() => setDateOpen(false)}
            open={dateOpen}
            components={{
              OpenPickerIcon: CalendarIcon as ElementType,
            }}
          />
        </div>
      </StyledTableCell>
      <StyledTableCell align="center">
        <span className="mr-3 text-lg font-bold">$</span>{" "}
        <input
          type="number"
          value={incomeAmount}
          className="w-5/12 py-1 text-end"
          placeholder="income amount"
          style={{
            outline: `1px solid ${LIGHT_GREY}`,
          }}
        ></input>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Select
          value={""}
          onChange={() => null}
          displayEmpty
          placeholder="Account"
          sx={{ height: 30, width: 3 / 4, borderRadius: 0 }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {accounts.map(({ id, accountName }) => {
            return (
              <MenuItem value={id} key={id}>
                {accountName}
              </MenuItem>
            );
          })}
        </Select>
      </StyledTableCell>
      <StyledTableCell className="tableRemoveButton cursor-pointer transition-colors">
        remove
      </StyledTableCell>
    </TableRow>
  );
};

export { IncomeRow };
