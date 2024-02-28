import { Day } from './Day'
import { MessagesUI } from './MessagesUI'
import { businessHours } from './config/config'

const { defaultStartBusinessDay } = businessHours

export class BusinessDay {
  constructor (today) {
    this.today = new Day(today)
  }

  getOrdersPeriods () {
    // const day = new Day(this.today)
    const isBusinessDay = this.today.isBusinessDay()
    if (!isBusinessDay) {
      const message = new MessagesUI()
      return message.disabledDay()
    }
    return this.today.getOrdersTime()
  }

  getDeliveryPeriods () {
    // const day = new Day(this.today)
    const isBusinessDay = this.today.isBusinessDay()
    if (!isBusinessDay) {
      const message = new MessagesUI()
      return message.disabledDay()
    }
    return this.today.getDeliveryTime()
  }

  isOrdersTime (hour) {
    let isTakeAwayPossible

    // const day = new Day(this.today)
    const isBusinessDay = this.today.isBusinessDay()
    if (!isBusinessDay) return { isBusinessDay }

    const isTakeAwayDay = this.today.isTakeAwayDay()
    if (isTakeAwayDay) {
      const takeAwayHours = this.today.getTakeAwayTime()
      const isInbetweenTakeAwayHours = Object.entries(takeAwayHours)
        .map(([_, businessHours]) => {
          const closeTime = businessHours[1]
          const isInTime = defaultStartBusinessDay <= hour && hour <= closeTime
          return isInTime
        })
        .filter(Boolean)

      isTakeAwayPossible = isInbetweenTakeAwayHours.length > 0
    }

    const ordersTime = this.today.getOrdersTime()
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
    // const day = new Day(this.today)
    const isBusinessDay = this.today.isBusinessDay()
    if (!isBusinessDay) {
      const message = new MessagesUI()
      return message.disabledDay()
    }
    const deliveryTime = this.today.getDeliveryTime()
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
