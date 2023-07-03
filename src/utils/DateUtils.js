import { lastDayOfMonth, isValid } from 'date-fns'

const TIME_PERIODS = {
  morning: '07:00',
  noon: '12:00',
  afternoon: '15:00',
  evening: '19:00',
  'pre-noon': '10:00'
}

  // IMPROVEMENTS
  // - Ideally we shouldn't have to parse the dates in the frontend. The best situation would be
  // if all the dates were already in a consistent format with the day and time defined, but if 
  // we could at least rely on all dates being in a valid date format we could convert easily that would
  // really help us tidy up this code 

export const parseNextReportingDate = (data) => {
  return data.map((company) => {
    let date = new Date(company.nextReportingDate)

    if (company.nextReportingInferred) {
      date = lastDayOfMonth(new Date(company.nextReportingDate))
    }

    const [day, time] = company.nextReportingDate.split(' ')

    if (!isValid(date) && company.nextReportingDate.includes('/')) {
      let d = day.split("/")
      date = new Date(d[2] + '-' + d[1] + '-' + d[0] + ' ' + time);
    }

    if (!isValid(date) && TIME_PERIODS[time]) {
      date = new Date(`${day} ${TIME_PERIODS[time]}`)
    }

    company.nextReportingDate = date
    return company
  })
}