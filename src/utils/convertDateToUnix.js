import { getUnixTime, parse } from 'date-fns'
const convertDateToUnix = (normalDate) => {
  const parsedDate = parse(normalDate, 'yyyy-MM-dd', new Date())
  const result = getUnixTime(parsedDate)
  return result
}

export default convertDateToUnix
