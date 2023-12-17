export function getTimeInfo () {
  const date = new Date()

  const currrentDay = date.getDay()
  const currentHour = date.getHours()
  const currentMinutes = date.getMinutes() * 0.01
  // const currrentDay = 5
  // const currentHour = 14
  // const currentMinutes = 45 * 0.01

  const currentTime = currentHour + currentMinutes

  return {
    currrentDay,
    currentTime
  }
}
