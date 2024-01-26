export async function getDeliveryMethods () {
  /// fetch

  // tener en cuenta para hacer la API -> mapear los días: 'lunes' -> 'lun'

  const numbers = {
    deliveryCostNumber: 500,
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
            day: 'Mier',
            ops: [
              {
                tag: 'Noche',
                businessHours: '20 a 0:30 hs'
              }
            ]
          },
          {
            day: 'Jue',
            ops: [
              {
                tag: 'Noche',
                businessHours: '20 a 0:30 hs'
              }
            ]
          },
          {
            day: 'Vier',
            ops: [
              {
                tag: 'Siesta',
                businessHours: '14:30 a 16:30'
              },
              {
                tag: 'Noche',
                businessHours: '20 a 2:00 hs'
              }
            ]
          },
          {
            day: 'Sab',
            ops: [
              {
                tag: 'Siesta',
                businessHours: '14:30 a 16:30'
              },
              {
                tag: 'Noche',
                businessHours: '20 a 2:00 hs'
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
