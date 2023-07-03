import React from 'react'
import {   
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  useReactTable,
  getFilteredRowModel
} from '@tanstack/react-table'
import { format } from 'date-fns'
import TableHeaderRow from './TableHeaderRow'

// IMPROVEMENTS NEEDED
// - Mobile styling needs work. Possibly some of the less important columns could be dropped on 
// smaller screens
// - Accessibility wasn't considered due to time restraints. At the minimum we should test that
// this passes colour contrast guidlines, that the input field and sort buttons are keyboard accessible,
// and that they have the approriate aria labels so they can be read by screen readers
// - As the list of data grows we could add in virtulization so we are only loading the rows as they appear
// on screen. This is not needed if we don't expect the data to grow
// - As the app grows we may need multiple tables with sort and filter functionality. We could seperate this
// component into a table component that takes data and columns.

const FinancialReportTable = (props) => {
  const columnHelper = createColumnHelper()
  const columns = React.useMemo(() => (
    [
      columnHelper.accessor('companyName', {
        header: () => <span>Company name</span>
      }),
      columnHelper.accessor('nextReportingDate', {
        cell: (info) => {
          return format(info.getValue(), 'dd MMM yyyy hh:mm bb')
        },
        header: () => <span>Next Reporting Date</span>,
        enableColumnFilter: false,
        sortType: 'datetime',
        sortDescFirst: false
      }),
      columnHelper.accessor('lastReportingDate', {
        header: () => <span>Last Reporting Date</span>,
        enableColumnFilter: false,
        sortType: 'datetime',
        sortDescFirst: false
      }),
      columnHelper.accessor('lastReportingPeriod', {
        header: () => <span>Last Reporting Period</span>,
        enableColumnFilter: false,
        enableSort: false,
        sortDescFirst: false
      }),
      columnHelper.accessor('nextReportingInferred', {
        header: () => <span>Next Reporting Inferred</span>,
        enableColumnFilter: false,
        enableSort: false
      })
    ]),
    [columnHelper]
  )
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const table = useReactTable({ 
    columns, 
    data: props.data, 
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      sorting,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters, 
  })

  return (
    <table className='w-full bg-white border border-slate-500'>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <TableHeaderRow headerGroup={headerGroup} key={headerGroup.id} />
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className='odd:bg-slate-100'>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className='px-4 py-3'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default FinancialReportTable