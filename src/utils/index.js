import { differenceInDays } from 'date-fns'

const convertDate = (date) => {
  const convertedDate = new Date(date * 1000).toString().slice(0, 25)
  const daysDifrrence = differenceInDays(new Date(), new Date(date * 1000))
  if (daysDifrrence === 0) {
    return convertedDate + ': ' + 'today'
  }
  return convertedDate + ': ' + daysDifrrence.toString() + 'day(s) ago'
}

export { convertDate }
