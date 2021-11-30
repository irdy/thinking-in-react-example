import React from "react";

type TableProps = {
  tableHeadings: string[];
  extraClass?: string;
}

export const Table = React.memo<React.PropsWithChildren<TableProps>>(
  function Table({tableHeadings, extraClass= "", children}) {
    return <table className={`app-table ${extraClass}`}>
      <thead>
      <tr>
        {
          tableHeadings.map((heading, key) => {
            return (
              <th className="at_table-head" key={key}>
                {heading}
              </th>
            )
          })
        }
      </tr>
      </thead>
      <tbody>
      {children}
      </tbody>
    </table>
  });

type TableRowsProps = { }

export const TableRow = React.memo<React.PropsWithChildren<TableRowsProps>>(function TableRow({children}) {
  return (
    <tr>
      {children}
    </tr>
  )
})

type TableCellProps = { }

export function TableCell({children}: React.PropsWithChildren<TableCellProps>) {
  return <td>
    {children}
  </td>
}

type TableRowLikeHeadingProps = {
  columnCount: number;
  extraClass?: string;
}

export function TableRowLikeHeading({columnCount, extraClass = "", children}: React.PropsWithChildren<TableRowLikeHeadingProps>) {
  return (
    <tr className={`app-table-row-like-heading ${extraClass}`}>
      {
        <td className={`atrlh_cell`} colSpan={columnCount}> {children} </td>
      }
    </tr>
  )
}

