import { buildBusinessHours } from '../model/buildBusinessHours'
import { currentTime } from './getTimeInfo'

export class Day {
  constructor (day) {
    this.day = day
  }

  async isBusinessDay () {
    const { notBusinessDays } = await buildBusinessHours()

    const isBusinessHour = new Set(notBusinessDays
      .map(({ day, startingHour: closeHour }) => {
        if (this.day !== day) return true
        if (currentTime > closeHour) return false
        return true
      }))
    return !isBusinessHour.has(false)
  }

  async getOrdersTime () {
    const dayBusinessHours = (await buildBusinessHours()).daysGrid.get(this.day)
    return dayBusinessHours.orders ?? {}
  }

  async getDeliveryTime () {
    const dayBusinessHours = (await buildBusinessHours()).daysGrid.get(this.day)
    return dayBusinessHours.delivery ?? {}
  }

  async getTakeAwayTime () {
    const dayBusinessHours = (await buildBusinessHours()).daysGrid.get(this.day)
    return dayBusinessHours.takeAway ?? {}
  }

  async isTakeAwayDay () {
    const { middayTakeAway } = await buildBusinessHours()
    const isDay = middayTakeAway && middayTakeAway
      .map(({ day }) => {
        return this.day === day
      })
      .filter(Boolean)
    return isDay?.length > 0
  }
}
