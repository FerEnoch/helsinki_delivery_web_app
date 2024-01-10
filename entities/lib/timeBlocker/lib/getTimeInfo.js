function getTimeInfo () {
  const date = new Date()

  const currrentDay = date.getDay()
  const currentHour = date.getHours()
  const currentMinutes = date.getMinutes() * 0.01

  const currentTime = currentHour + currentMinutes

  return {
    currrentDay,
    currentTime
  }
}

export const {
  currrentDay,
  currentTime
} = getTimeInfo()
