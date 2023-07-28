import { styled, TableCell } from "@mui/material";
import { EXTRA_LIGHT_GREY } from "../../../utils/constants";
import { TableRow } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { type Transaction } from "@prisma/client";
import dayjs from "dayjs";
import EditIcon from "../../../../public/edit-icon.svg";
import { useRouter } from "next/router";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
    border: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    border: "none",
  },
}));

const TransactionLine = ({
  index,
  transaction,
}: {
  index: number;
  transaction: Transaction;
}) => {
  const router = useRouter();

  const handleEdit = async () => {
    await router.push({
      pathname: `/transactions/${transaction.id}`,
    });
  };

  return (
    <TableRow
      style={{
        backgroundColor: index % 2 === 0 ? EXTRA_LIGHT_GREY : "#fff",
      }}
    >
      <StyledTableCell align="center" className="w-1/6 font-light">
        {transaction.name}
      </StyledTableCell>
      <StyledTableCell align="center" className="w-1/6 font-light">
        {dayjs(transaction.date).format("L LT")}
      </StyledTableCell>
      <StyledTableCell align="center" className="w-1/6 font-light">
        Account
      </StyledTableCell>
      <StyledTableCell align="center" className="w-1/6 font-light">
        {String(transaction.amount)}
      </StyledTableCell>
      <StyledTableCell align="center" className="w-1/6">
        <EditIcon
          onClick={() => handleEdit()}
          className="icon--hoverBlue mb-1 h-4 w-4 cursor-pointer transition-all"
        />
      </StyledTableCell>
    </TableRow>
  );
};

export { TransactionLine };
