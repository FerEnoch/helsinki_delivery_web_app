export const weekDays = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
]

export const spanishWeekDay = [
  'Dom',
  'Lun',
  'Mar',
  'Mier',
  'Jue',
  'Vier',
  'Sab'
]

export const periods = ['earlyMorning', 'midday', 'day', 'night']

export const businessHours = {
  defaultStartBusinessDay: 10,
  defaultStartDelivery: 20,
  defaultEndBusinessDay: 0.15,
  extendedBusinessDay: 1.45,
  notBusinessDays: [{
    day: weekDays[0], // sunday
    startingHour: 1.45
  }, {
    day: weekDays[1], // monday
    startingHour: 0
  }, {
    day: weekDays[2], // tuesday
    startingHour: 0
  }],
  middayTakeAway: [
    {
      day: weekDays[5], // friday
      hours: {
        [periods[1]]: [14.3, 16.3]
      }
    },
    {
      day: weekDays[6], // saturday
      hours: {
        [periods[1]]: [14.3, 16.3]
      }
    }
  ]
}
