import { styled, TableCell } from "@mui/material";
import { EXTRA_LIGHT_GREY } from "../../../utils/constants";
import { TableRow } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
    border: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    border: "none",
  },
}));

const TransactionLine = ({ index }: { index: number }) => {
  return (
    <TableRow
      style={{
        backgroundColor: index % 2 === 0 ? EXTRA_LIGHT_GREY : "#fff",
      }}
    >
      <StyledTableCell align="center" className="font-light">
        Budget
      </StyledTableCell>
      <StyledTableCell align="center" className="font-light">
        Date
      </StyledTableCell>
      <StyledTableCell align="center" className="font-light">
        Account
      </StyledTableCell>
      <StyledTableCell align="center" className="font-light">
        Amount
      </StyledTableCell>
    </TableRow>
  );
};

export { TransactionLine };
