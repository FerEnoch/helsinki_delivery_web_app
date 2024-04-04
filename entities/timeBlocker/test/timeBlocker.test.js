import { describe, expect, it } from 'vitest'
import { currentTime, currrentDay } from '../lib/getTimeInfo'
import { buildBusinessHours } from '../model/buildBusinessHours'
import { weekdays } from '../lib/config/weekdays'

describe('Time blocker', () => {
  it('Should return client current weekday and time in number format type', () => {
    expect(currentTime).toBeTypeOf('number')
    expect(currrentDay).toBeTypeOf('number')
  })

  it('Should build up the week business hours map correctly', async () => {
    const initialData = {
      openToOrders: 10,
      businessHours: {
        delivery: {
          normalNight: { from: 20, to: 0.15 },
          extendedNight: { from: 20, to: 1.45 }
        },
        takeAway: {
          earlyAfternoon: { from: 15, to: 17 },
          normalNight: { from: 20, to: 0.15 },
          extendedNight: { from: 20, to: 1.45 }
        }
      },
      grid: [
        {
          day: 'monday',
          delivery: 'Cerrado',
          takeAway: 'Cerrado'
        },
        {
          day: 'tuesday',
          delivery: 'Cerrado',
          takeAway: 'Cerrado'
        },
        {
          day: 'wednesday',
          delivery: 'Horario normal',
          takeAway: 'Noche normal'
        },
        {
          day: 'thursday',
          delivery: 'Horario normal',
          takeAway: 'Noche normal'
        },
        {
          day: 'friday',
          delivery: 'Horario normal',
          takeAway: 'Siesta y noche normal'
        },
        {
          day: 'saturday',
          delivery: 'Horario normal',
          takeAway: 'Siesta y noche extendido'
        },
        {
          day: 'sunday',
          delivery: 'Cerrado',
          takeAway: 'Cerrado'
        }
      ]
    }

    const {
      openToOrders,
      grid: initialGrid,
      businessHours
    } = initialData
    const { daysGrid } = await buildBusinessHours({
      openToOrders,
      initialGrid,
      businessHours
    })

    expect(daysGrid.size).toBe(weekdays.length)
  })

  it('Should build not-business days and hole week map correctly', async () => {
    const initialData = {
      openToOrders: 10,
      businessHours: {
        delivery: {
          normalNight: { from: 20, to: 0.15 },
          extendedNight: { from: 20, to: 1.45 }
        },
        takeAway: {
          earlyAfternoon: { from: 15, to: 17 },
          normalNight: { from: 20, to: 0.15 },
          extendedNight: { from: 20, to: 1.45 }
        }
      },
      grid: [
        {
          day: 'monday',
          delivery: 'Cerrado',
          takeAway: 'Cerrado'
        },
        {
          day: 'sunday',
          delivery: 'Cerrado',
          takeAway: 'Cerrado'
        }
      ]
    }

    const {
      openToOrders,
      grid: initialGrid,
      businessHours
    } = initialData
    const { notBusinessDays, daysGrid } = await buildBusinessHours({
      openToOrders,
      initialGrid,
      businessHours
    })

    expect(daysGrid.size).toBe(weekdays.length)
    expect(notBusinessDays).toHaveLength(2)
  })

  it('Should build midday take-away days and hole week map correctly', async () => {
    const initialData = {
      openToOrders: 10,
      businessHours: {
        delivery: {
          normalNight: { from: 20, to: 0.15 },
          extendedNight: { from: 20, to: 1.45 }
        },
        takeAway: {
          earlyAfternoon: { from: 15, to: 17 },
          normalNight: { from: 20, to: 0.15 },
          extendedNight: { from: 20, to: 1.45 }
        }
      },
      grid: [
        {
          day: 'monday',
          delivery: 'Cerrado',
          takeAway: 'Siesta y noche normal'
        },
        {
          day: 'wednesday',
          delivery: 'Cerrado',
          takeAway: 'Siesta y noche extendido'
        },
        {
          day: 'sunday',
          delivery: 'Cerrado',
          takeAway: 'Siesta'
        }
      ]
    }

    const {
      openToOrders,
      grid: initialGrid,
      businessHours
    } = initialData
    const { middayTakeAway, daysGrid } = await buildBusinessHours({
      openToOrders,
      initialGrid,
      businessHours
    })

    expect(daysGrid.size).toBe(weekdays.length)
    expect(middayTakeAway).toHaveLength(3)
  })

  it('Should build each day data completely', async () => {
    const initialData = {
      openToOrders: 10,
      businessHours: {
        delivery: {
          normalNight: { from: 20, to: 0.15 },
          extendedNight: { from: 20, to: 1.45 }
        },
        takeAway: {
          earlyAfternoon: { from: 15, to: 17 },
          normalNight: { from: 20, to: 0.15 },
          extendedNight: { from: 20, to: 1.45 }
        }
      },
      grid: [
        {
          day: 'monday',
          delivery: 'Cerrado',
          takeAway: 'Cerrado'
        },
        {
          day: 'tuesday',
          delivery: 'Cerrado',
          takeAway: 'Cerrado'
        },
        {
          day: 'wednesday',
          delivery: 'Horario normal',
          takeAway: 'Noche normal'
        },
        {
          day: 'thursday',
          delivery: 'Horario normal',
          takeAway: 'Noche normal'
        },
        {
          day: 'friday',
          delivery: 'Horario normal',
          takeAway: 'Siesta y noche normal'
        },
        {
          day: 'saturday',
          delivery: 'Horario normal',
          takeAway: 'Siesta y noche extendido'
        },
        {
          day: 'sunday',
          delivery: 'Cerrado',
          takeAway: 'Cerrado'
        }
      ]
    }

    const {
      openToOrders,
      grid: initialGrid,
      businessHours
    } = initialData
    const { daysGrid } = await buildBusinessHours({
      openToOrders,
      initialGrid,
      businessHours
    })

    daysGrid.forEach(day => {
      expect(day).toHaveProperty('tags')
      expect(day).toHaveProperty('orders')
      expect(day).toHaveProperty('takeAway')
      expect(day).toHaveProperty('delivery')

      const { orders, delivery, takeAway } = day
      expect(orders).toHaveProperty('earlyMorning')
      expect(orders).toHaveProperty('day')
      expect(delivery).toHaveProperty('earlyMorning')
      expect(delivery).toHaveProperty('night')
      expect(takeAway).toHaveProperty('earlyMorning')
      expect(takeAway).toHaveProperty('midday')
      expect(takeAway).toHaveProperty('night')
    })
  })

  it('Should build each day data correctly', async () => {
    const initialData = {
      openToOrders: 10,
      businessHours: {
        delivery: {
          normalNight: { from: 20, to: 0.15 },
          extendedNight: { from: 20, to: 1.45 }
        },
        takeAway: {
          earlyAfternoon: { from: 15, to: 17 },
          normalNight: { from: 20, to: 0.15 },
          extendedNight: { from: 20, to: 1.45 }
        }
      },
      grid: [
        {
          day: 'monday',
          delivery: 'Cerrado',
          takeAway: 'Cerrado'
        },
        {
          day: 'tuesday',
          delivery: 'Cerrado',
          takeAway: 'Cerrado'
        },
        {
          day: 'wednesday',
          delivery: 'Horario normal',
          takeAway: 'Noche normal'
        },
        {
          day: 'thursday',
          delivery: 'Horario normal',
          takeAway: 'Noche normal'
        },
        {
          day: 'friday',
          delivery: 'Horario extendido',
          takeAway: 'Siesta y noche normal'
        },
        {
          day: 'saturday',
          delivery: 'Horario extendido',
          takeAway: 'Siesta y noche extendido'
        },
        {
          day: 'sunday',
          delivery: 'Cerrado',
          takeAway: 'Cerrado'
        }
      ]
    }

    const {
      openToOrders,
      grid: initialGrid,
      businessHours
    } = initialData
    const { daysGrid } = await buildBusinessHours({
      openToOrders,
      initialGrid,
      businessHours
    })

    const sunday = daysGrid.get('sunday')
    expect(sunday.delivery.earlyMorning).toEqual([0, 1.45])
    expect(sunday.takeAway.earlyMorning).toEqual([0, 1.45])
    expect(sunday.delivery.night).toHaveLength(0)
    expect(sunday.takeAway.night).toHaveLength(0)

    const monday = daysGrid.get('monday')
    expect(monday.delivery.night).toHaveLength(0)
    expect(monday.takeAway.night).toHaveLength(0)

    const tuesday = daysGrid.get('tuesday')
    expect(tuesday.delivery.night).toHaveLength(0)
    expect(tuesday.takeAway.night).toHaveLength(0)

    const wednesday = daysGrid.get('wednesday')
    expect(wednesday.delivery.night).toEqual([20, 23.59])
    expect(wednesday.takeAway.night).toEqual([20, 23.59])

    const thursday = daysGrid.get('thursday')
    expect(thursday.delivery.earlyMorning).toEqual([0, 0.15])
    expect(thursday.delivery.night).toEqual([20, 23.59])
    expect(thursday.takeAway.night).toEqual([20, 23.59])

    const friday = daysGrid.get('friday')
    expect(friday.delivery.earlyMorning).toEqual([0, 0.15])
    expect(friday.delivery.night).toEqual([20, 23.59])
    expect(friday.takeAway.midday).toEqual([15, 17])
    expect(friday.takeAway.night).toEqual([20, 23.59])

    const saturday = daysGrid.get('saturday')
    expect(saturday.delivery.earlyMorning).toEqual([0, 1.45])
    expect(saturday.delivery.earlyMorning).toEqual([0, 1.45])
    expect(saturday.delivery.night).toEqual([20, 23.59])
    expect(saturday.takeAway.midday).toEqual([15, 17])
    expect(saturday.takeAway.night).toEqual([20, 23.59])
  })

  it('Should relate data correctly', async () => {
    const initialData = {
      openToOrders: 10,
      businessHours: {
        delivery: {
          normalNight: { from: 20, to: 0.15 },
          extendedNight: { from: 20, to: 1.45 }
        },
        takeAway: {
          earlyAfternoon: { from: 15, to: 17 },
          normalNight: { from: 20, to: 0.15 },
          extendedNight: { from: 20, to: 1.45 }
        }
      },
      grid: [
        {
          day: 'monday',
          delivery: 'Cerrado',
          takeAway: 'Siesta y noche extendido'
        },
        {
          day: 'tuesday',
          delivery: 'Cerrado',
          takeAway: 'Cerrado'
        },
        {
          day: 'wednesday',
          delivery: 'Horario extendido',
          takeAway: 'Noche normal'
        },
        {
          day: 'thursday',
          delivery: 'Horario normal',
          takeAway: 'Noche extendido'
        },
        {
          day: 'friday',
          delivery: 'Horario extendido',
          takeAway: 'Siesta y noche normal'
        },
        {
          day: 'saturday',
          delivery: 'Horario extendido',
          takeAway: 'Siesta y noche extendido'
        },
        {
          day: 'sunday',
          delivery: 'Cerrado',
          takeAway: 'Cerrado'
        }
      ]
    }

    const {
      openToOrders,
      grid: initialGrid,
      businessHours
    } = initialData
    const { daysGrid } = await buildBusinessHours({
      openToOrders,
      initialGrid,
      businessHours
    })

    const daysDraft = {
      sunday: 'saturday',
      monday: 'sunday',
      tuesday: 'monday',
      wednesday: 'tuesday',
      thursday: 'wednesday',
      friday: 'thursday',
      saturday: 'friday'
    }

    daysGrid.forEach((day, _, map) => {
      const {
        tags: currentDayTags,
        orders: currentDayOrders,
        delivery: currentDayDelivery,
        takeAway: currentDayTakeAway
      } = day

      const currentDayClosedDelivery = currentDayTags.delivery === 'Cerrado'
      const currentDayClosedTakeAway = currentDayTags.takeAway === 'Cerrado'

      const currentDayNormalDelivery = /normal/i.test(currentDayTags.delivery)
      const currentDayNormalTakeAway = /normal/i.test(currentDayTags.takeAway)

      const currentDayExtendedDelivery = /extendido/i.test(currentDayTags.delivery)
      const currentDayExtendedTakeAway = /extendido/i.test(currentDayTags.takeAway)

      const dayBefore = daysDraft[currentDayTags.englishDay]
      const dayAfter = Object.entries(daysDraft).find(
        ([, after]) => after === currentDayTags.englishDay
      )[0]

      const {
        tags: dayBeforeTags
        // orders: dayBeforeOrders,
        // delivery: dayBeforeDelivery,
        // takeAway: dayBeforeTakeAway
      } = map.get(dayBefore)

      const {
        // tags: dayAfterTags,
        orders: dayAfterOrders,
        delivery: dayAfterDelivery,
        takeAway: dayAfterTakeAway
      } = map.get(dayAfter)

      if (currentDayClosedDelivery && currentDayClosedTakeAway) {
        expect(currentDayOrders.day).toHaveLength(0)
      } else {
        expect(currentDayOrders.day).toEqual([openToOrders, 23.59])
      }

      if (currentDayClosedDelivery) {
        if (dayBeforeTags.delivery.includes('Cerrado')) {
          expect(currentDayDelivery).toEqual({ earlyMorning: [], night: [] })
        } else if (dayBeforeTags.delivery.includes('normal')) {
          expect(currentDayDelivery).toEqual({ earlyMorning: [0, 0.15], night: [] })
        } else if (dayBeforeTags.delivery.includes('extendido')) {
          expect(currentDayDelivery).toEqual({ earlyMorning: [0, 1.45], night: [] })
        }
      }

      if (currentDayClosedTakeAway) {
        if (dayBeforeTags.takeAway.includes('Cerrado')) {
          expect(currentDayTakeAway).toEqual({ earlyMorning: [], midday: [], night: [] })
        } else if (dayBeforeTags.takeAway.includes('normal')) {
          expect(currentDayTakeAway).toEqual({ earlyMorning: [0, 0.15], midday: [], night: [] })
        } else if (dayBeforeTags.takeAway.includes('extendido')) {
          expect(currentDayTakeAway).toEqual({ earlyMorning: [0, 1.45], midday: [], night: [] })
        }
      }

      if (currentDayNormalDelivery) {
        expect(dayAfterDelivery.earlyMorning).toEqual([0, 0.15])
        if (currentDayNormalTakeAway) {
          expect(dayAfterOrders.earlyMorning).toEqual([0, 0.15])
        } else if (currentDayExtendedTakeAway) {
          // We coordinate orders with delivery, not with take-away
          expect(dayAfterOrders.earlyMorning).toEqual([0, 0.15])
        }
      } else if (currentDayExtendedDelivery) {
        expect(dayAfterOrders.earlyMorning).toEqual([0, 1.45])
        expect(dayAfterDelivery.earlyMorning).toEqual([0, 1.45])
      }

      if (currentDayNormalTakeAway) {
        expect(dayAfterTakeAway.earlyMorning).toEqual([0, 0.15])
        if (currentDayNormalDelivery) {
          expect(dayAfterOrders.earlyMorning).toEqual([0, 0.15])
        } else if (currentDayExtendedDelivery) {
          // We coordinate orders with delivery, not with take-away
          expect(dayAfterOrders.earlyMorning).toEqual([0, 1.45])
        }
      } else if (currentDayExtendedTakeAway) {
        expect(dayAfterTakeAway.earlyMorning).toEqual([0, 1.45])
        if (currentDayNormalDelivery) {
          expect(dayAfterOrders.earlyMorning).toEqual([0, 0.15])
        } else if (currentDayExtendedDelivery) {
          expect(dayAfterOrders.earlyMorning).toEqual([0, 1.45])
        }
      }
    })
  })
})
