import { useState } from "react";
import {
  Modal,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { GREEN, GREY, LIGHT_GREY } from "../../../utils/constants";
import CloseIcon from "../../../../public/close-icon.svg";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import CalendarIcon from "../../../../public/calendar-icon.svg";
import type { ElementType } from "react";
import { ClickAwayListener } from "@mui/base";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import PlusIcon from "../../../../public/plus-icon.svg";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
    border: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    border: "none",
  },
}));

const DateModal = ({
  modalOpen,
  onClose,
}: {
  modalOpen: boolean;
  onClose: (param: boolean) => void;
}) => {
  const [dateOpen, setDateOpen] = useState(false);

  return (
    <Modal open={modalOpen}>
      <div className="flex h-full items-center justify-center">
        <ClickAwayListener onClickAway={() => onClose(false)}>
          <div className="mb-20 flex h-3/5 w-2/3 flex-col items-start justify-start rounded-md bg-white py-8 px-5 lg:w-1/3">
            <div
              className="flex w-full items-center border-x-0 border-y-0 border-b pb-1"
              style={{ borderColor: LIGHT_GREY }}
            >
              <CloseIcon
                className="mr-12 h-4 w-4 cursor-pointer"
                style={{ color: GREY }}
                onClick={() => onClose(false)}
              />
              <p className=" text-2xl font-light 2xl:text-3xl">
                Modal Payment Dates
              </p>
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Amount</StyledTableCell>
                    <StyledTableCell align="center">Date</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableCell align="center">
                    <span className="mr-3 text-lg font-bold">$</span>{" "}
                    <input
                      type="number"
                      value={0}
                      className="w-5/12 py-1 text-end"
                      placeholder="income amount"
                      style={{
                        outline: `1px solid ${LIGHT_GREY}`,
                      }}
                    ></input>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <DesktopDatePicker
                      renderInput={({ inputRef }) => (
                        <div ref={inputRef}>
                          <CalendarIcon
                            className="mx-auto h-7 w-7 cursor-pointer"
                            onClick={() => setDateOpen((prev) => !prev)}
                          />
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
                  </StyledTableCell>
                  <StyledTableCell />
                  <StyledTableCell />
                </TableBody>
              </Table>
            </TableContainer>
            <div className="mt-5 flex w-full justify-center">
              <PlusIcon
                className="h-6 w-6 cursor-pointer rounded-3xl py-1 px-1 outline outline-2 "
                style={{ outlineColor: GREEN, fill: GREEN }}
              />
            </div>
          </div>
        </ClickAwayListener>
      </div>
    </Modal>
  );
};

export { DateModal };
