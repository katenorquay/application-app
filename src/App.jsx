import React from 'react';
import FinancialReportTable from './FinancialReportTable'
import { parseNextReportingDate } from './utils/DateUtils'

  // IMPROVEMENTS
  // - We should also track loading state in the fetch useEffect and render a spinner or other feedback
  // - We may need more specific error messaging
  // - This could be moved into a generic hook that can be used to fetch other data

function App() {
  const [tableData, setTableData] = React.useState([])
  const [error, setError] = React.useState(undefined)

  React.useEffect(() => {
    fetch('mock-reporting-dates.json')
      .then((response) => {
        setError(undefined)
        return response.json()
      })
      .then((data) => {
        setTableData(parseNextReportingDate(data))
      })
      .catch((error) => {
        setError(error)
      })
  }, [])

  return (
    <div className='flex justify-center p-4'>
      {error && 'Sorry something went wrong, please refresh and try again'}
      <FinancialReportTable data={tableData} />
    </div>
  );
}

export default App;