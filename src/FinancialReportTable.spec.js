import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import FinancialReportTable from './FinancialReportTable';
import { parseNextReportingDate } from './utils/DateUtils'
import data from '../public/mock-reporting-dates'

// IMPROVEMENTS
// - App needs more testing. It would be good to test the fetching and setting of the data, and the rendering of
// and error message on failure.

const tableData = parseNextReportingDate(data.slice(0, 3))

describe('FinancialReportTable', () => {
  test('renders table headers', () => {
    render(<FinancialReportTable data={tableData} />)
    screen.getByText('Company name')
    screen.getByText('Next Reporting Date')
    screen.getByText('Last Reporting Date')
    screen.getByText('Last Reporting Period')
    screen.getByText('Next Reporting Inferred')
  });

  test('renders table rows', () => {
    render(<FinancialReportTable data={tableData} />)
    screen.getByText('Abercrombie and Fitch')
    screen.getByText('Adler Group')
    screen.getByText('American Airlines')
  });

  test('filters table rows', () => {
    render(<FinancialReportTable data={tableData} />)
    act(() => userEvent.type(screen.getByPlaceholderText('Search company'), 'Adl'))
    screen.getByText('Adler Group')
    expect(screen.queryByText('Abercrombie and Fitch')).not.toBeInTheDocument()
    expect(screen.queryByText('American Airlines')).not.toBeInTheDocument()
  });
})