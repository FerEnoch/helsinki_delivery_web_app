import { Day } from './Day'
import { MessagesUI } from './MessagesUI'
import { businessHours } from './config'

const { defaultStartBusinessDay } = businessHours

export class BusinessDay {
  constructor (today) {
    this.today = today
  }

  getOrdersPeriods () {
    const day = new Day(this.today)
    const isBusinessDay = day.isBusinessDay()
    if (!isBusinessDay) {
      const message = new MessagesUI()
      return message.disabledDay()
    }
    return day.getOrdersTime()
  }

  getDeliveryPeriods () {
    const day = new Day(this.today)
    const isBusinessDay = day.isBusinessDay()
    if (!isBusinessDay) {
      const message = new MessagesUI()
      return message.disabledDay()
    }
    return day.getDeliveryTime()
  }

  isOrdersTime (hour) {
    let isTakeAwayPossible

    const day = new Day(this.today)
    const isBusinessDay = day.isBusinessDay()
    if (!isBusinessDay) return { isBusinessDay }

    const isTakeAwayDay = day.isTakeAwayDay()
    if (isTakeAwayDay) {
      const takeAwayHours = day.getTakeAwayTime()
      const isInbetweenTakeAwayHours = Object.entries(takeAwayHours)
        .map(([_, businessHours]) => {
          const closeTime = businessHours[1]
          const isInTime = defaultStartBusinessDay <= hour && hour <= closeTime
          return isInTime
        })
        .filter(Boolean)

      isTakeAwayPossible = isInbetweenTakeAwayHours.length > 0
    }

    const ordersTime = day.getOrdersTime()
    const isInbetweenOrdersTime = Object.entries(ordersTime)
      .map(([_, businessHours]) => {
        const initialTime = businessHours[0]
        const closeTime = businessHours[1]
        const isInTime = initialTime <= hour && hour <= closeTime
        return isInTime
      })
      .filter(Boolean)

    const canBookOrders = isInbetweenOrdersTime.length > 0
    return { isTakeAwayPossible, canBookOrders, isBusinessDay }
  }

  isDeliveyTime (hour) {
    const day = new Day(this.today)
    const isBusinessDay = day.isBusinessDay()
    if (!isBusinessDay) {
      const message = new MessagesUI()
      return message.disabledDay()
    }
    const deliveryTime = day.getDeliveryTime()
    const isInbetweenDeliveryTime = Object.entries(deliveryTime)
      .map(([_, businessHours]) => {
        const initialTime = businessHours[0]
        const closeTime = businessHours[1]
        const isInTime = initialTime <= hour && hour <= closeTime
        return isInTime
      })
      .filter(Boolean)

    const result = isInbetweenDeliveryTime.length > 0
    return result
  }
}
