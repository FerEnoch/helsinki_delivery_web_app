import { businessHours } from '../lib/config/config'
import { dayPeriods } from '../lib/config/periods'
import { weekdays } from '../lib/config/weekdays'

const {
  defaultStartBusinessDay,
  defaultEndBusinessDay,
  extendedBusinessDay,
  defaultStartDelivery,
  middayTakeAway
} = businessHours

const { DAY, NIGHT, EARLY_MORNING, MIDDAY } = dayPeriods
const { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY } = weekdays

const weekDaysDeliveryOpenCloseHours = {
  [SUNDAY]: {
    // sunday
    orders: {
      [EARLY_MORNING]: [0, extendedBusinessDay]
      // [DAY]: [defaultStartBusinessDay, 23.59] // Agregado de carnaval
    },
    delivery: {
      [EARLY_MORNING]: [0, extendedBusinessDay]
      // [NIGHT]: [defaultStartDelivery, 23.59] // agregado de carnaval
    },
    takeAway: {}
  },
  [MONDAY]: {
    // monday
    orders: {
      // [EARLY_MORNING]: [0, defaultEndBusinessDay], // agregado de carnaval
      // [DAY]: [defaultStartBusinessDay, 23.59] // Agregado de carnaval
    },
    delivery: {
      // [EARLY_MORNING]: [0, defaultEndBusinessDay], // agregado de carnaval
      // [NIGHT]: [defaultStartDelivery, 23.59] // agregado de carnaval
    },
    takeAway: {}
  },
  [TUESDAY]: {
    // tuesday
    orders: {
      // [EARLY_MORNING]: [0, defaultEndBusinessDay] // agregado de carnaval
    },
    delivery: {
      // [EARLY_MORNING]: [0, defaultEndBusinessDay] // agregado de carnaval
    },
    takeAway: {}
  },
  [WEDNESDAY]: {
    // wednesday
    orders: {
      [DAY]: [defaultStartBusinessDay, 23.59]
    },
    delivery: {
      [NIGHT]: [defaultStartDelivery, 23.59]
    },
    takeAway: {}
  },
  [THURSDAY]: {
    // thursday
    orders: {
      [EARLY_MORNING]: [0, defaultEndBusinessDay],
      [DAY]: [defaultStartBusinessDay, 23.59]
    },
    delivery: {
      [EARLY_MORNING]: [0, defaultEndBusinessDay],
      [NIGHT]: [defaultStartDelivery, 23.59]
    },
    takeAway: {}
  },
  [FRIDAY]: {
    // friday
    orders: {
      [EARLY_MORNING]: [0, defaultEndBusinessDay],
      [DAY]: [defaultStartBusinessDay, 23.59]
    },
    delivery: {
      [EARLY_MORNING]: [0, defaultEndBusinessDay],
      [NIGHT]: [defaultStartDelivery, 23.59]
    },
    takeAway: {
      [MIDDAY]: middayTakeAway[0].hours[MIDDAY]
    }
  },
  [SATURDAY]: {
    // saturday
    orders: {
      [EARLY_MORNING]: [0, extendedBusinessDay],
      [DAY]: [defaultStartBusinessDay, 23.59]
    },
    delivery: {
      [EARLY_MORNING]: [0, extendedBusinessDay],
      [NIGHT]: [defaultStartDelivery, 23.59]
    },
    takeAway: {
      [MIDDAY]: middayTakeAway[1].hours[MIDDAY]
    }
  }
}

export const businessHoursMap = new Map(
  Object.entries(weekDaysDeliveryOpenCloseHours)
)
