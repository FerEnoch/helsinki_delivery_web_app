import { Day } from './Day'
import { MessagesUI } from './MessagesUI'
import { dayPeriods } from './config/periods'

export class BusinessDay extends Day {
  async getOrdersPeriods () {
    const isBusinessDay = await this.isBusinessDay()
    if (!isBusinessDay) {
      const message = new MessagesUI()
      return message.disabledDay()
    }
    return await this.getOrdersTime()
  }

  async getDeliveryPeriods () {
    const isBusinessDay = await this.isBusinessDay()
    if (!isBusinessDay) {
      const message = new MessagesUI()
      return message.disabledDay()
    }
    return await this.getDeliveryTime()
  }

  async isOrdersTime (currentTime) {
    let isMiddayTakeAwayPossible
    const isBusinessDay = await this.isBusinessDay()
    if (!isBusinessDay) return { isBusinessDay }

    const isTakeAwayDay = await this.isMiddayTakeAwayDay()
    if (isTakeAwayDay) {
      const takeAwayHours = await this.getTakeAwayTime()

      // const { openToOrders: defaultStartBusinessDay } = await fetchBusinessHoursData()
      const isInbetweenTakeAwayHours = Object.entries(takeAwayHours)
        .map(([dayPeriod, businessHours]) => {
          if (dayPeriod !== dayPeriods.MIDDAY) return null
          if (!businessHours) return null
          const [, closeTime] = businessHours
          const isInTime = this.openToOrders <= currentTime && currentTime <= closeTime
          return isInTime
        })
        .filter(Boolean)
      isMiddayTakeAwayPossible = isInbetweenTakeAwayHours.length > 0
    }

    const ordersTime = await this.getOrdersTime()
    const isInbetweenOrdersTime = Object.values(ordersTime)
      .map(businessHours => {
        if (!businessHours) return null
        const [initialTime, closeTime] = businessHours
        // const initialTime = businessHours[0]
        // const closeTime = businessHours[1]
        const isInTime = initialTime <= currentTime && currentTime <= closeTime
        return isInTime
      })
      .filter(Boolean)

    const canBookOrders = isInbetweenOrdersTime.length > 0
    return { isMiddayTakeAwayPossible, canBookOrders, isBusinessDay }
  }

  async isDeliveyTime (currentTime) {
    const isBusinessDay = await this.isBusinessDay()
    if (!isBusinessDay) {
      const message = new MessagesUI()
      return message.disabledDay()
    }
    const deliveryTime = await this.getDeliveryTime()
    const isInbetweenDeliveryTime = Object.values(deliveryTime)
      .map(businessHours => {
        if (!businessHours) return null
        const [initialTime, closeTime] = businessHours
        // const initialTime = businessHours[0]
        // const closeTime = businessHours[1]
        const isInTime = initialTime <= currentTime && currentTime <= closeTime
        return isInTime
      })
      .filter(Boolean)

    const result = isInbetweenDeliveryTime.length > 0
    return result
  }
}
