import { buildBusinessHours } from '../model/buildBusinessHours'
import { getBusinessHours } from '../service/getBusinessHours'
import { currentTime } from './getTimeInfo'

export class Day {
  constructor (day) {
    this.day = day
  }

  async retrieveBusinessGrid () {
    const {
      grid: initialGrid,
      openToOrders,
      businessHours
    } = await getBusinessHours()

    const { daysGrid, notBusinessDays, middayTakeAway } = await buildBusinessHours({
      openToOrders,
      initialGrid,
      businessHours
    })

    this.daysGrid = daysGrid
    this.notBusinessDays = notBusinessDays
    this.middayTakeAway = middayTakeAway
  }

  async isBusinessDay () {
    // await this.retrieveBusinessGrid()

    const isBusinessHour = new Set(this.notBusinessDays
      .map(({ day, startingHour: closeHour }) => {
        if (this.day !== day) return true
        if (currentTime > closeHour) return false
        return true
      }))
    return !isBusinessHour.has(false)
  }

  async getOrdersTime () {
    // await this.retrieveBusinessGrid()

    const dayBusinessHours = this.daysGrid.get(this.day)
    return dayBusinessHours.orders ?? {}
  }

  async getDeliveryTime () {
    // await this.retrieveBusinessGrid()

    const dayBusinessHours = this.daysGrid.get(this.day)
    return dayBusinessHours.delivery ?? {}
  }

  async getTakeAwayTime () {
    const dayBusinessHours = this.daysGrid.get(this.day)
    return dayBusinessHours.takeAway ?? {}
  }

  async isTakeAwayDay () {
    // await this.retrieveBusinessGrid()
    const isDay = this.middayTakeAway
      .map(({ day }) => {
        return this.day === day
      })
      .filter(Boolean)
    return isDay?.length > 0
  }
}
