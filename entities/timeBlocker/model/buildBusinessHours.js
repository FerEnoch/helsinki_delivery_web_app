import { dayLimits, dayPeriods } from '../lib/config/periods'
import { spanishWeekdays, weekdays } from '../lib/config/weekdays'
import { APITerms } from '../lib/config/terms'

export async function buildBusinessHours ({
  openToOrders: defaultStartBusinessDay,
  initialGrid,
  businessHours
}) {
  const {
    delivery: apiDeliveryHours,
    takeAway: apiTakeAwayHours
  } = businessHours

  const { normalNight: deliveryNormalNight, extendedNight: deliveryExtendedNight } = apiDeliveryHours
  const { normalNight: takeAwayNormalNight, extendedNight: takeAwayExtendedNight, earlyAfternoon: takeAwayEarlyAfternoon } = apiTakeAwayHours

  const notBusinessDays = initialGrid
    .map(({ day, delivery, takeAway }, index, week) => {
      if (!day) return null
      const dayBefore = index - 1 < 0 ? week[week.length - 1] : week[index - 1]
      let startingHour
      switch (dayBefore.delivery) {
        case APITerms.DELIVERY_EXTENDED:
          startingHour = deliveryExtendedNight.to
          break
        case APITerms.DELIVERY_NORMAL:
          startingHour = deliveryNormalNight.to
          break
        case APITerms.CLOSED:
          startingHour = 0
      }
      return {
        day,
        delivery,
        takeAway,
        startingHour
      }
    })
    .filter(
      day =>
        APITerms.CLOSED === day.delivery && APITerms.CLOSED === day.takeAway
    )
    .filter(Boolean)

  // Vemos si hay take-away a la siesta
  const middayTakeAway = initialGrid
    .filter(({ takeAway }) => {
      return (
        APITerms.TAKE_AWAY_AFTERNOON === takeAway ||
        APITerms.TAKE_AWAY_AFTERNOON_NORMAL_NIGHT === takeAway ||
        APITerms.TAKE_AWAY_AFTERNOON_EXTENDED_NIGHT === takeAway
      )
    })
    .map(({ day }) => {
      return {
        day,
        hours: {
          [dayPeriods.MIDDAY]: [
            takeAwayEarlyAfternoon.from,
            takeAwayEarlyAfternoon.to
          ]
        }
      }
    })

  /**/ // declara función
  function getHours ({ dayToFind }) {
    if (!dayToFind) return
    const dayHours = {}
    switch (dayToFind.delivery) {
      case APITerms.DELIVERY_EXTENDED:
        dayHours.delivery = deliveryExtendedNight
        break
      case APITerms.DELIVERY_NORMAL:
        dayHours.delivery = deliveryNormalNight
        break
      case APITerms.CLOSED:
        dayHours.delivery = {}
    }

    switch (dayToFind.takeAway) {
      case APITerms.TAKE_AWAY_EXTENDED_NIGHT:
      case APITerms.TAKE_AWAY_AFTERNOON_EXTENDED_NIGHT:
        dayHours.takeAway = takeAwayExtendedNight
        break
      case APITerms.TAKE_AWAY_NORMAL_NIGHT:
      case APITerms.TAKE_AWAY_AFTERNOON_NORMAL_NIGHT:
        dayHours.takeAway = takeAwayNormalNight
        break
      case APITerms.TAKE_AWAY_AFTERNOON:
      case APITerms.CLOSED:
        dayHours.takeAway = {}
    }
    return dayHours
  }

  /************/

  // declara función
  function getEarlyMorningHours ({ hours, method }) {
    if (!hours) return
    if (Object.values(hours[method]).length === 0) return []
    return (hours[method] && [dayLimits.start, hours[method].to]) || []
  }

  // declara función
  function getDayHours ({ hours, method, isClosedCompletely = null }) {
    if (!hours) return
    if (isClosedCompletely || Object.values(hours[method]).length === 0) return []
    return [hours[method].from, dayLimits.end]
  }

  /**/ // Comienza loop
  const daysGrid = new Map()
  weekdays.forEach((day, index, week) => {
    const dayBefore = index - 1 < 0 ? week[week.length - 1] : week[index - 1]
    const dayBeforeHours = getHours({
      dayToFind: initialGrid.find(({ day: gridDay }) => gridDay === dayBefore)
    })
    const currentDayHours = getHours({
      dayToFind: initialGrid.find(({ day: gridDay }) => gridDay === day)
    })

    const isClosedCompletely = notBusinessDays.find(
      ({ day: closedDay }) => closedDay === day
    )
    const hasMiddayTakeAway = middayTakeAway.find(
      ({ day: takeAwayDay }) => takeAwayDay === day
    )
    const earlyMorningDelivery = getEarlyMorningHours({
      hours: dayBeforeHours,
      method: 'delivery'
    })

    const earlyMorningTakeAway = getEarlyMorningHours({
      hours: dayBeforeHours,
      method: 'takeAway'
    })

    const currentDayDelivery = getDayHours({
      hours: currentDayHours,
      method: 'delivery',
      isClosedCompletely
    })
    const currentDayTakeAway = getDayHours({
      hours: currentDayHours,
      method: 'takeAway',
      isClosedCompletely
    })

    const { DAY, NIGHT, EARLY_MORNING, MIDDAY } = dayPeriods

    const currentDayMiddayTakeAway = (isClosedCompletely || !hasMiddayTakeAway) ? [] : hasMiddayTakeAway.hours[MIDDAY]

    const currentDayOrders = isClosedCompletely ? [] : [defaultStartBusinessDay, dayLimits.end]

    // Posibilidad de recibir pedidos
    const earlyMorningOrders =
      earlyMorningDelivery?.length > 0
        ? earlyMorningDelivery
        : earlyMorningTakeAway

    // build day business hours
    daysGrid.set(day, {
      tags: initialGrid
        .filter(({ day: gridDay }) => gridDay === day)
        .map(({ day, delivery, takeAway }) => {
          return {
            englishDay: day,
            dayTag: spanishWeekdays[weekdays.indexOf(day)],
            delivery,
            takeAway
          }
        })[0],
      orders: {
        [EARLY_MORNING]: earlyMorningOrders,
        [DAY]: currentDayOrders
      },
      delivery: {
        [EARLY_MORNING]: earlyMorningDelivery,
        [NIGHT]: currentDayDelivery
      },
      takeAway: {
        [EARLY_MORNING]: earlyMorningTakeAway,
        [MIDDAY]: currentDayMiddayTakeAway,
        [NIGHT]: currentDayTakeAway
      }
    })
  })

  return {
    daysGrid,
    notBusinessDays,
    middayTakeAway
  }
}
