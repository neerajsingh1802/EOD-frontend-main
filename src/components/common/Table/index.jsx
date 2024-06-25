import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableFooter, TablePagination } from "@mui/material";

const TableComponent = ({
  rows = [],
  columns = [],
  minWidth = 650,
  titleCellClasses,
  rowClassesMethod = () => {},
  rowClasses = "",
  rowCellClasses,
  rowsPerPage,
  page,
  handleChangePage,
  paginator = false,
}) => {
  return (
    <TableContainer data-testid="table">
      <Table sx={{ minWidth: minWidth }}>
        <TableHead>
          <TableRow>
            {columns.map((col, i) => (
              <TableCell
                style={{ width: col.width && col.width }}
                key={i}
                className={`${titleCellClasses} text-nowrap`}
              >
                {col.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: "true",
                },
              }}
              className={`${rowClassesMethod(i, row)} ${rowClasses}`}
            >
              {columns.map((col, index) => {
                return (
                  <TableCell
                    key={index}
                    className={rowCellClasses}
                    align="center"
                  >
                    {col.render(row)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
        {paginator && (
          <TableFooter>
            <TableRow>
              <TablePagination
                count={rows.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                page={page}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
