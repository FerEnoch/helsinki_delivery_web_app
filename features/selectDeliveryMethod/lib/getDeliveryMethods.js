import { dayPeriodsTags } from '@/entities/timeBlocker/lib/config/periods'
import { APITerms } from '@/entities/timeBlocker/lib/config/terms'
import { buildBusinessHours } from '@/entities/timeBlocker/model/buildBusinessHours'
import { getBusinessHours } from '@/entities/timeBlocker/service/getBusinessHours'
import { formatHour } from './utils/formatHour'

export async function getDeliveryMethods () {
  const {
    grid: initialGrid,
    openToOrders,
    businessHours,
    deliveryCost
  } = await getBusinessHours()

  const { daysGrid } = await buildBusinessHours({
    initialGrid,
    openToOrders,
    businessHours
  })

  const { takeAway: takeAwayHours } = businessHours
  const takeAwayNormalNightEnd = takeAwayHours.normalNight.to
  const takeAwayExtendedNightEnd = takeAwayHours.extendedNight.to
  const daysGridObject = Object.fromEntries(daysGrid.entries())

  const costs = {
    delivery: deliveryCost,
    takeAway: 0
  }

  return [
    {
      label: 'Delivery',
      info: '',
      price: costs.delivery,
      isDefault: true,
      options: null
    },
    {
      label: 'Take away',
      info: 'Urquiza y Cánd. Pujato',
      price: costs.takeAway,
      isDefault: false,
      options: {
        label: 'Elegí día y horario',
        select: Object.values(daysGridObject)
          .filter(
            ({ tags: { takeAway: takeAwayTag } }) =>
              takeAwayTag !== APITerms.CLOSED
          )
          .map(
            ({
              tags: { dayTag, takeAway: takeAwayTag },
              takeAway: takeAwayHours
            }) => {
              const takeAwayComposedNormal = new Map()
              const takeAwayComposedExtended = new Map()

              return {
                day: dayTag,
                generalTag: `Horario ${takeAwayTag.toLowerCase()}`, // -> NOT IN USAGE
                ops: Object.values(takeAwayHours)
                  .slice(1)
                  .filter(hours => hours.length > 0)
                  .map(hours => {
                    const [from, to] = hours
                    switch (takeAwayTag) {
                      case APITerms.TAKE_AWAY_NORMAL_NIGHT:
                        return {
                          tag: dayPeriodsTags.NIGHT,
                          businessHours: `${formatHour(from)} a ${formatHour(takeAwayNormalNightEnd)}`
                        }
                      case APITerms.TAKE_AWAY_EXTENDED_NIGHT:
                        return {
                          tag: dayPeriodsTags.NIGHT,
                          businessHours: `${formatHour(from)} a ${formatHour(takeAwayExtendedNightEnd)}`
                        }
                      case APITerms.TAKE_AWAY_AFTERNOON:
                        return {
                          tag: dayPeriodsTags.EARLY_AFTERNOON,
                          businessHours: `${formatHour(from)} a ${formatHour(to)}`
                        }
                      case APITerms.TAKE_AWAY_AFTERNOON_NORMAL_NIGHT:
                        if (!takeAwayComposedNormal.has(1)) {
                          takeAwayComposedNormal.set(1, {
                            tag: dayPeriodsTags.EARLY_AFTERNOON,
                            businessHours: `${formatHour(from)} a ${formatHour(to)}`
                          })
                          break
                        }
                        if (takeAwayComposedNormal.has(1) && !takeAwayComposedNormal.has(2)) {
                          takeAwayComposedNormal.set(2, {
                            tag: dayPeriodsTags.NIGHT,
                            businessHours: `${formatHour(from)} a ${formatHour(takeAwayNormalNightEnd)}`
                          })
                          return Array.from(
                            takeAwayComposedNormal.values()
                          ).flat()
                        }
                        break
                      case APITerms.TAKE_AWAY_AFTERNOON_EXTENDED_NIGHT:
                        if (!takeAwayComposedExtended.has(1)) {
                          takeAwayComposedExtended.set(1, {
                            tag: dayPeriodsTags.EARLY_AFTERNOON,
                            businessHours: `${formatHour(from)} a ${formatHour(to)}`
                          })
                          break
                        }
                        if (takeAwayComposedExtended.has(1) && !takeAwayComposedExtended.has(2)) {
                          takeAwayComposedExtended.set(2, {
                            tag: dayPeriodsTags.NIGHT,
                            businessHours: `${formatHour(from)} a ${formatHour(takeAwayExtendedNightEnd)}`
                          })
                          return Array.from(
                            takeAwayComposedExtended.values()
                          ).flat()
                        }
                    }
                    return null
                  })
                  .flat()
                  .filter(Boolean)
              }
            }
          )
      }
    }
  ]
}

/* OLD API
{
        label: 'Elegí Día y horario',
        // TO DO
        select: [ // make a loop -- possibly, map UI ops[{ tag }]
          {
            day: 'Dom',
            ops: [
              {
                tag: 'Noche',
                businessHours: '20:00 a 0:30'
              }
            ]
          },
          {
            day: 'Lun',
            ops: [
              {
                tag: null,
                businessHours: null
              }
            ]
          },
          {
            day: 'Mar',
            ops: [
              {
                tag: null,
                businessHours: null
              }
            ]
          },
          {
            day: 'Mier',
            ops: [
              {
                tag: 'Noche',
                businessHours: '20:00 a 0:30'
              }
            ]
          },
          {
            day: 'Jue',
            ops: [
              {
                tag: 'Noche',
                businessHours: '20:00 a 0:30'
              }
            ]
          },
          {
            day: 'Vier',
            ops: [
              {
                tag: 'Noche',
                businessHours: '20:00 a 2:00'
              }
            ]
          },
          {
            day: 'Sab',
            ops: [
              // {
              //   tag: 'Siesta',
              //   businessHours: '15:00 a 17:00'
              // },
              {
                tag: 'Noche',
                businessHours: '20:00 a 2:00'
              }
            ]
          }
        ]
      }
       */
