export const weekDays = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
]

export const periods = ['earlyMorning', 'midday', 'day', 'night']

export const businessHours = {
  defaultStartBusinessDay: 10,
  defaultEndBusinessDay: 0.3,
  extendedBusinessDay: 2,
  defaultStartDelivery: 20,
  notBusinessDays: [{
    day: weekDays[0], // sunday
    startingHour: 2
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
        [periods[1]]: [13.3, 15.3]
      }
    },
    {
      day: weekDays[6], // saturday
      hours: {
        [periods[1]]: [13.3, 15.3]
      }
    }
  ]
}
