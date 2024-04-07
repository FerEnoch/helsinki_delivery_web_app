// import { finalBusinessGrid } from '@/__test__/businessHoursAPI'

export async function getBusinessHours () {
  // TO DO
  //  fetch from endpoint, which retrieves from firebase / cache
  const finalBusinessGrid = JSON.stringify({
    deliveryCost: 750,
    openToOrders: 10,
    businessHours: {
      delivery: {
        normalNight: { from: 20, to: 0.15 },
        extendedNight: { from: 20, to: 1.45 }
      },
      takeAway: {
        earlyAfternoon: { from: 14, to: 16 },
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
        takeAway: 'Noche extendido'
      },
      {
        day: 'saturday',
        delivery: 'Horario extendido',
        takeAway: 'Noche extendido'
      },
      {
        day: 'sunday',
        delivery: 'Cerrado',
        takeAway: 'Cerrado'
      }
    ]
  })

  return JSON.parse(finalBusinessGrid)
}
