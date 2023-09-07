import { differenceInDays } from 'date-fns'

const convertDate = (date) => {
  const daysDifrrence = differenceInDays(new Date(), new Date(date * 1000))
  if (daysDifrrence === 0) {
    return 'today'
  }
  return daysDifrrence.toString() + 'day(s) ago'
}

const convertDateWithFullInfo = (date) => {
  const convertedDate = new Date(date * 1000).toString().slice(0, 25)
  const daysDifrrence = differenceInDays(new Date(), new Date(date * 1000))
  if (daysDifrrence === 0) {
    return 'today'
  }
  return convertedDate + daysDifrrence.toString() + 'day(s) ago'
}

export { convertDate, convertDateWithFullInfo }
