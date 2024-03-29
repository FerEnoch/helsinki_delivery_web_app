// import { dayPeriods } from './periods'
import { weekdays } from './weekdays'

// const defaultMiddayTakeAway = [15, 17]

/*
*  armar este config con la  api
*/

export const businessHours = {
  defaultStartBusinessDay: 10,
  defaultStartDelivery: 20,
  defaultEndBusinessDay: 0.15,
  extendedBusinessDay: 1.45,
  notBusinessDays: [
  /**
   * MODIFICACIONES POR FERIADO DE SEMANA SANTA
   */
    // {
    //   day: weekdays.SUNDAY, // sunday
    //   startingHour: 1.45
    // },
    {
      day: weekdays.MONDAY, // monday
      startingHour: 0.15
    },
    {
      day: weekdays.TUESDAY, // tuesday
      startingHour: 0
    }],
  middayTakeAway: [
    // NO MORE TAKE AWAY TILL NEXT SUMMER
    // {
    //   day: weekdays.FRIDAY, // friday
    //   hours: {
    //     [dayPeriods.MIDDAY]: defaultMiddayTakeAway
    //   }
    // },
    // {
    //   day: weekdays.SATURDAY, // saturday
    //   hours: {
    //     [dayPeriods.MIDDAY]: defaultMiddayTakeAway
    //   }
    // }
  ]
}
