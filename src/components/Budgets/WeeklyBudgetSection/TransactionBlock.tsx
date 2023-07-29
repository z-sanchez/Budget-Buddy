import { styled, TableBody, TableCell, TextField } from "@mui/material";
import { Table, TableContainer, TableHead, TableRow } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { TransactionLine } from "./TransactionLine";
import { type Transaction } from "@prisma/client";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
    border: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    border: "none",
  },
}));

const TransactionBlock = ({
  blockName,
  transactions,
}: {
  blockName: string;
  transactions: Array<Transaction & { budgetName: string }>;
}) => {
  return (
    <>
      <div className="mt-5 flex w-full items-center justify-between">
        <p className="font-semibold">{blockName}</p>
        <TextField hiddenLabel size="small" placeholder="Search Transactions" />
      </div>
      {!transactions.length ? (
        <div className="mt-5 flex w-full items-center justify-center">
          <p className="font-semibold">No Transactions</p>
        </div>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">
                  Transaction Name
                </StyledTableCell>
                <StyledTableCell align="center">Budget</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Account</StyledTableCell>
                <StyledTableCell align="center">Amount</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => {
                return (
                  <TransactionLine
                    index={index}
                    transaction={transaction}
                    key={transaction.id}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export { TransactionBlock };
