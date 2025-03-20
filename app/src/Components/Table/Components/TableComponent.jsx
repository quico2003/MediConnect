import { Table } from "react-bootstrap";
import { useTable } from "react-table";
import Loader from "../../Loader/Loader";

const TableComponent = ({ fetching, className = "", data, columns }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const renderTableHeader = () =>
    headerGroups.map((headerGroup) => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <th
            className= "py-3"
            {...column.getHeaderProps({
              style: {
                width: column.width || "auto",
                maxWidth: column.maxWidth,
                minWidth: column.minWidth || column.width,
              },
            })}
          >
            {column.render("Header")}
          </th>
        ))}
      </tr>
    ));

  const renderTableBody = () =>
    rows.map((row, idx) => {
      prepareRow(row);
      return renderRow(row, idx, rows.length - 1 === idx);
    });

  const renderRow = (row, index, isLast) => (
    <tr key={`btr-${index}`} {...row.getRowProps()}>
      {row.cells.map((cell, idx) => (
        <td
          className="py-3"
          key={`btd-${idx}`}
          {...cell.getCellProps({
            style: {
              width: cell.width || "auto",
              maxWidth: cell.maxWidth,
              minWidth: cell.minWidth || cell.width,
            },
          })}
        >
          {cell.render("Cell")}
        </td>
      ))}
    </tr>
  );

  return (
    <div
      className={`border rounded overflow-auto shadow-sm position-relative ${className}`}
    >
      {fetching && (
        <div
          className="position-absolute left-0 top-0 w-100 h-100"
          style={{ background: "#EEEEEEAA", zIndex: 999 }}
        >
          <Loader animation="grow" />
        </div>
      )}
      <Table className="mb-0" {...getTableProps()}>
        <thead className="fw-bold bg-light">{renderTableHeader()}</thead>
        <tbody
          className="overflow-auto"
          {...getTableBodyProps({ style: { minHeight: 100 } })}
        >
          {renderTableBody()}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
