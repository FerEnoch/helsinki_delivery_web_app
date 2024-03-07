export async function getDeliveryMethods () {
  /// fetch

  // tener en cuenta para hacer la API -> mapear los días: 'lunes' -> 'lun'
  /**
  * Tener una sola fuente de verdad con businessHoursMap...
  */
  const numbers = {
    deliveryCostNumber: 750,
    takeAwayCostNumber: 0
  }

  const fetchedData = [
    {
      label: 'Delivery',
      info: '',
      price: numbers.deliveryCostNumber,
      isDefault: true,
      options: null
    },
    {
      label: 'Take away',
      info: 'Urquiza y Cánd. Pujato',
      price: numbers.takeAwayCostNumber,
      isDefault: false,
      options: {
        label: 'Elegí Día y horario',
        select: [
          {
            day: 'Dom',
            ops: [
              {
                tag: null,
                businessHours: null
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
              {
                tag: 'Siesta',
                businessHours: '15:00 a 17:00'
              },
              {
                tag: 'Noche',
                businessHours: '20:00 a 2:00'
              }
            ]
          }
        ]
      }
    }
  ]

  const [delivery, takeAway] = fetchedData

  return [delivery, takeAway]
}
