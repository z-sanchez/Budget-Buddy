import DropdownIcon from "../../../../public/dropdown-icon.svg";
import PlusIcon from "../../../../public/plus-icon.svg";
import { useState } from "react";
import { Collapse, styled, TableBody, TableCell } from "@mui/material";
import { GREEN, LIGHT_GREY } from "../../../utils/constants";
import { Table, TableContainer, TableHead, TableRow } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { IncomeRow } from "./IncomeRow";

const accounts = [
  {
    id: 1,
    accountName: "Wells Fargo 1",
  },
  {
    id: 2,
    accountName: "Wells Fargo 2",
  },
  {
    id: 3,
    accountName: "Bofa",
  },
  {
    id: 4,
    accountName: "Bella's Wells Fargo",
  },
];

const testData = [
  {
    incomeId: 1,
    incomeName: "Calix",
    incomeAmount: 800,
    accounts: [...accounts],
  },
  {
    incomeId: 2,
    incomeName: "Regeneron",
    incomeAmount: 1000,
    accounts: [...accounts],
  },
];

const IncomeSection = () => {
  const [expandSection, setExpandSection] = useState(false);

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      fontWeight: "bold",
      border: "none",
    },
    [`&.${tableCellClasses.body}`]: {
      border: "none",
    },
  }));

  return (
    <>
      <div
        className="my-4 flex w-full cursor-pointer justify-between px-8"
        onClick={() => setExpandSection((prev) => !prev)}
      >
        <div className="flex w-full items-center">
          <DropdownIcon
            className={`${
              expandSection ? "" : "-rotate-90"
            } mr-3 cursor-pointer transition`}
          />
          <p
            className="w-full border-x-0 border-y-0 border-b pb-1 text-2xl font-light 2xl:text-3xl"
            style={{ borderColor: LIGHT_GREY }}
          >
            Income Details
          </p>
        </div>
      </div>
      <div className="flex w-full justify-center px-8">
        <Collapse in={expandSection} className="w-10/12">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Income Name</StyledTableCell>
                  <StyledTableCell align="center">Frequency</StyledTableCell>
                  <StyledTableCell align="center">
                    Monthly Income Amount
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Desposit Account
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {testData.map((data) => {
                  return <IncomeRow key={data.incomeId} {...data} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="mt-5 flex justify-center">
            <PlusIcon
              className="h-6 w-6 cursor-pointer rounded-3xl py-1 px-1 outline outline-2 "
              style={{ outlineColor: GREEN, fill: GREEN }}
            />
          </div>
        </Collapse>
      </div>
    </>
  );
};

export { IncomeSection };
