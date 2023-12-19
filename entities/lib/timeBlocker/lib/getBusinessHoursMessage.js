import { BusinessDay } from './BusinessDay'
import { MessagesUI } from './MessagesUI'
import { weekDays } from './config'
import { getTimeInfo } from './getTimeInfo'

export function getBusinessHoursMessage () {
  const { currrentDay, currentTime } = getTimeInfo()
  const currentWeekDay = new BusinessDay(weekDays[currrentDay])
  const returnMessages = new MessagesUI()

  const { isTakeAwayPossible, canBookOrders, isBusinessDay } = currentWeekDay.isOrdersTime(currentTime)

  if (!isBusinessDay) return returnMessages.disabledDay()
  if (isTakeAwayPossible) return returnMessages.addTakeAway()
  if (!canBookOrders) return returnMessages.disabledHours()

  const isDeliveryTime = currentWeekDay.isDeliveyTime(currentTime)
  if (!isDeliveryTime) return returnMessages.bookOrderNotDelivey()

  return 'OK'
}
