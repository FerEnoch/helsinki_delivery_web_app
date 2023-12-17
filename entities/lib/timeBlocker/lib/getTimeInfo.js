export function getTimeInfo () {
  const date = new Date()

  const currrentDay = date.getDay()
  const currentHour = date.getHours()
  const currentMinutes = date.getMinutes() * 0.01
  // const currrentDay = 0
  // const currentHour = 2
  // const currentMinutes = 1 * 0.01

  const currentTime = currentHour + currentMinutes

  return {
    currrentDay,
    currentTime
  }
}
