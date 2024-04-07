import { BusinessDay } from './BusinessDay'
import { MessagesUI } from './MessagesUI'
import { weekdays } from './config/weekdays'
import { currentTime, currrentDay } from './getTimeInfo'

export async function getBusinessHoursMessage () {
  const currentWeekDay = new BusinessDay(weekdays[currrentDay])
  await currentWeekDay.retrieveBusinessGrid()

  const returnMessages = new MessagesUI()

  const { isMiddayTakeAwayPossible, canBookOrders, isBusinessDay } = await currentWeekDay.isOrdersTime(currentTime)

  if (!isBusinessDay) return returnMessages.disabledDay()
  if (isMiddayTakeAwayPossible) return returnMessages.addTakeAway()
  if (!canBookOrders) return returnMessages.disabledHours()

  const isDeliveryTime = await currentWeekDay.isDeliveyTime(currentTime)
  if (!isDeliveryTime) return returnMessages.bookOrderNotDelivey()

  return 'OK'
}
