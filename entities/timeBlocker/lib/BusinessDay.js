import { Day } from './Day'
import { MessagesUI } from './MessagesUI'
import { getBusinessHours } from '../service/getBusinessHours'

export class BusinessDay {
  constructor (today) {
    this.today = new Day(today)
  }

  async getOrdersPeriods () {
    const isBusinessDay = await this.today.isBusinessDay()
    if (!isBusinessDay) {
      const message = new MessagesUI()
      return message.disabledDay()
    }
    return await this.today.getOrdersTime()
  }

  async getDeliveryPeriods () {
    const isBusinessDay = await this.today.isBusinessDay()
    if (!isBusinessDay) {
      const message = new MessagesUI()
      return message.disabledDay()
    }
    return await this.today.getDeliveryTime()
  }

  async isOrdersTime (hour) {
    let isTakeAwayPossible
    const isBusinessDay = await this.today.isBusinessDay()
    if (!isBusinessDay) return { isBusinessDay }

    const isTakeAwayDay = await this.today.isTakeAwayDay()
    if (isTakeAwayDay) {
      const takeAwayHours = await this.today.getTakeAwayTime()
      const { openToOrders: defaultStartBusinessDay } = await getBusinessHours()
      const isInbetweenTakeAwayHours = Object.values(takeAwayHours)
        .map(businessHours => {
          if (!businessHours) return null
          const [, closeTime] = businessHours
          // const closeTime = businessHours[1]
          const isInTime = defaultStartBusinessDay <= hour && hour <= closeTime
          return isInTime
        })
        .filter(Boolean)

      isTakeAwayPossible = isInbetweenTakeAwayHours.length > 0
    }

    const ordersTime = await this.today.getOrdersTime()
    const isInbetweenOrdersTime = Object.values(ordersTime)
      .map(businessHours => {
        if (!businessHours) return null
        const [initialTime, closeTime] = businessHours
        // const initialTime = businessHours[0]
        // const closeTime = businessHours[1]
        const isInTime = initialTime <= hour && hour <= closeTime
        return isInTime
      })
      .filter(Boolean)

    const canBookOrders = isInbetweenOrdersTime.length > 0
    return { isTakeAwayPossible, canBookOrders, isBusinessDay }
  }

  async isDeliveyTime (hour) {
    const isBusinessDay = await this.today.isBusinessDay()
    if (!isBusinessDay) {
      const message = new MessagesUI()
      return message.disabledDay()
    }
    const deliveryTime = await this.today.getDeliveryTime()
    const isInbetweenDeliveryTime = Object.values(deliveryTime)
      .map(businessHours => {
        if (!businessHours) return null
        const [initialTime, closeTime] = businessHours
        // const initialTime = businessHours[0]
        // const closeTime = businessHours[1]
        const isInTime = initialTime <= hour && hour <= closeTime
        return isInTime
      })
      .filter(Boolean)

    const result = isInbetweenDeliveryTime.length > 0
    return result
  }
}
