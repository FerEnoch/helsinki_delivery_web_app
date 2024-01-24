export async function getDeliveryMethods () {
  /// fetch

  const numbers = {
    deliveryCostNumber: 750,
    takeAwayCostNumber: 0
  }

  return [
    {
      label: 'Delivery',
      info: '',
      price: numbers.deliveryCostNumber,
      isDefault: true,
      options: null
    },
    {
      label: 'Take away',
      info: '(Urquiza y Cánd. Pujato)',
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
}
