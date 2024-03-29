import { BusinessDay } from './BusinessDay'
import { MessagesUI } from './MessagesUI'
import { weekdays } from './config/weekdays'
import { currentTime, currrentDay } from './getTimeInfo'

export function getBusinessHoursMessage () {
  const currentWeekDay = new BusinessDay(Object.values(weekdays)[currrentDay])
  const returnMessages = new MessagesUI()

  const { isTakeAwayPossible, canBookOrders, isBusinessDay } = currentWeekDay.isOrdersTime(currentTime)

  if (!isBusinessDay) return returnMessages.disabledDay()
  if (isTakeAwayPossible) return returnMessages.addTakeAway()
  if (!canBookOrders) return returnMessages.disabledHours()

  const isDeliveryTime = currentWeekDay.isDeliveyTime(currentTime)
  if (!isDeliveryTime) return returnMessages.bookOrderNotDelivey()

  return 'OK'
}
