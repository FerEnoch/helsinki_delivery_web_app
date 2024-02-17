/**
 TO DO :  sacar las const y los maps a otro archivo
 */

// export const weekDays = [ // old API
//   'sunday',
//   'monday',
//   'tuesday',
//   'wednesday',
//   'thursday',
//   'friday',
//   'saturday'
// ]

export const weekDaysMap = {
  SUNDAY: 'sunday',
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday'
}

export const spanishWeekDay = [
  'Dom',
  'Lun',
  'Mar',
  'Mier',
  'Jue',
  'Vier',
  'Sab'
]

// export const periods = ['earlyMorning', 'midday', 'day', 'night'] // old API
export const dayPeriods = {
  EARLY_MORNING: 'earlyMorning',
  MIDDAY: 'midday',
  DAY: 'day',
  NIGHT: 'night'
}

const defaultMiddayTakeAway = [14.3, 16.3]

export const businessHours = {
  defaultStartBusinessDay: 10,
  defaultStartDelivery: 20,
  defaultEndBusinessDay: 0.15,
  extendedBusinessDay: 1.45,
  notBusinessDays: [
    {
      day: weekDaysMap.SUNDAY, // sunday
      startingHour: 1.45
    },
    {
      day: weekDaysMap.MONDAY, // monday
      startingHour: 0
    },
    {
      day: weekDaysMap.TUESDAY, // tuesday
      startingHour: 0.15
    }],
  middayTakeAway: [
    {
      day: weekDaysMap.FRIDAY, // friday
      hours: {
        [dayPeriods.MIDDAY]: defaultMiddayTakeAway
      }
    },
    {
      day: weekDaysMap.SATURDAY, // saturday
      hours: {
        [dayPeriods.MIDDAY]: defaultMiddayTakeAway
      }
    }
  ]
}
