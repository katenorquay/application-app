import { parseNextReportingDate } from './DateUtils'
import data from '../../public/mock-reporting-dates'

describe('DateUtils', () => {
  it('parseNextReportingDate', () => {
    const result = parseNextReportingDate(data.slice(0, 4))
    expect(result[0].nextReportingDate.toString()).toBe('Tue Nov 22 2022 12:30:00 GMT+0000 (Greenwich Mean Time)')
    expect(result[1].nextReportingDate.toString()).toBe('Tue Nov 29 2022 06:00:00 GMT+0000 (Greenwich Mean Time)')
    expect(result[2].nextReportingDate.toString()).toBe('Tue Jan 31 2023 00:00:00 GMT+0000 (Greenwich Mean Time)')
    expect(result[3].nextReportingDate.toString()).toBe('Tue Nov 08 2022 19:00:00 GMT+0000 (Greenwich Mean Time)')
  })
})