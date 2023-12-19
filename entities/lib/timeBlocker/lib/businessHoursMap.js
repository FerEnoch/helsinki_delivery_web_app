import { businessHours, periods, weekDays } from './config'

const {
  defaultStartBusinessDay,
  defaultEndBusinessDay,
  extendedBusinessDay,
  defaultStartDelivery,
  middayTakeAway
} = businessHours

const weekDaysDeliveryOpenCloseHours = {
  [weekDays[0]]: {
    // sunday
    orders: {
      [periods[0]]: [0, extendedBusinessDay]
    },
    delivery: {
      [periods[0]]: [0, extendedBusinessDay]
    },
    takeAway: {}
  },
  [weekDays[1]]: {
    // monday
    orders: {
      [periods[0]]: [0, defaultEndBusinessDay]
    },
    delivery: {
      [periods[0]]: [0, defaultEndBusinessDay]
    },
    takeAway: {}
  },
  [weekDays[2]]: {
    // tuesday
    orders: {},
    delivery: {},
    takeAway: {}
  },
  [weekDays[3]]: {
    // wednesday
    orders: {
      [periods[2]]: [defaultStartBusinessDay, 23.59]
    },
    delivery: {
      [periods[3]]: [defaultStartDelivery, 23.59]
    },
    takeAway: {}
  },
  [weekDays[4]]: {
    // thursday
    orders: {
      [periods[0]]: [0, defaultEndBusinessDay],
      [periods[2]]: [defaultStartBusinessDay, 23.59]
    },
    delivery: {
      [periods[0]]: [0, defaultEndBusinessDay],
      [periods[3]]: [defaultStartDelivery, 23.59]
    },
    takeAway: {}
  },
  [weekDays[5]]: {
    // friday
    orders: {
      [periods[0]]: [0, defaultEndBusinessDay],
      [periods[2]]: [defaultStartBusinessDay, 23.59]
    },
    delivery: {
      [periods[0]]: [0, defaultEndBusinessDay],
      [periods[3]]: [defaultStartDelivery, 23.59]
    },
    takeAway: {
      [periods[1]]: middayTakeAway[0].hours[periods[1]]
    }
  },
  [weekDays[6]]: {
    // saturday
    orders: {
      [periods[0]]: [0, extendedBusinessDay],
      [periods[2]]: [defaultStartBusinessDay, 23.59]
    },
    delivery: {
      [periods[0]]: [0, extendedBusinessDay],
      [periods[3]]: [defaultStartDelivery, 23.59]
    },
    takeAway: {
      [periods[1]]: middayTakeAway[1].hours[periods[1]]
    }
  }
}

export const businessHoursMap = new Map(
  Object.entries(weekDaysDeliveryOpenCloseHours)
)
