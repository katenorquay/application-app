
import { flexRender } from '@tanstack/react-table'
import classNames from 'classnames'

const TableHeaderRow = ({ headerGroup }) => {
  return (
    <tr>
      {headerGroup.headers.map(header => (
          <th 
            key={header.id} 
            className='align-top text-left font-normal text-white bg-emerald-700 p-4'
          >
            <div 
              className={classNames({
                'cursor-pointer select-none': header.column.getCanSort(),
                'font-bold': header.column.getIsSorted()
              })}
              onClick={header.column.getToggleSortingHandler()}
            >
              {flexRender(
                header.column.columnDef.header,
                header.getContext()
              )}
              {{
                asc: ' ▲',
                desc: ' ▼',
              }[header.column.getIsSorted()] ?? null}
            </div>
            {header.column.getCanFilter() && (
              <label htmlFor='search-company-name'>
                <input
                  id='search-company-name'
                  placeholder='Search company'
                  className='mt-2 p-1 text-black'
                  value={header.column.getFilterValue() || ''}
                  onChange={e => {
                    header.column.setFilterValue(e.target.value)
                  }
                  }
                />
              </label>
            )}
          </th>
        )
      )}
    </tr>
  )
}

export default TableHeaderRow