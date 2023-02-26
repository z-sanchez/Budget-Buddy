import { styled, TableBody, TableCell, TextField } from "@mui/material";
import { Table, TableContainer, TableHead, TableRow } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { TransactionLine } from "./TransactionLine";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
    border: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    border: "none",
  },
}));

const TransactionBlock = ({ blockName }: { blockName: string }) => {
  return (
    <>
      <div className="mt-5 flex w-full items-center justify-between">
        <p className="font-semibold">{blockName}</p>
        <TextField hiddenLabel size="small" placeholder="Search Transactions" />
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Budget</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Account</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">Paid Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TransactionLine index={0} />
            <TransactionLine index={1} />
            <TransactionLine index={2} />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export { TransactionBlock };
