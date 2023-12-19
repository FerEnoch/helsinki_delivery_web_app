import { businessHoursMap } from './businessHoursMap'
import { businessHours } from './config'
import { getTimeInfo } from './getTimeInfo'

const { middayTakeAway, notBusinessDays } = businessHours

export class Day {
  constructor (day) {
    this.day = day
    this.businessHoursMap = businessHoursMap
  }

  isBusinessDay () {
    const { currentTime } = getTimeInfo()
    // console.log(`It's ${this.day} - ${currentTime} hs`)

    const isBusinessHour = new Set(notBusinessDays
      .map(({ day, startingHour: closeHour }) => {
        if (this.day !== day) return true
        if (currentTime > closeHour) return false
        return true
      }))
    return !isBusinessHour.has(false)
  }

  getOrdersTime () {
    const dayBusinessHours = this.businessHoursMap.get(this.day)
    return dayBusinessHours.orders
  }

  getDeliveryTime () {
    const dayBusinessHours = this.businessHoursMap.get(this.day)
    return dayBusinessHours.delivery
  }

  isTakeAwayDay () {
    const isDay = middayTakeAway
      .map(({ day }) => {
        return this.day === day
      })
      .filter(Boolean)
    return isDay.length > 0
  }

  getTakeAwayTime () {
    const dayBusinessHours = this.businessHoursMap.get(this.day)
    return dayBusinessHours.takeAway
  }
}
