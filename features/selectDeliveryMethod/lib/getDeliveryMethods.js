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
      price: numbers.deliveryCostNumber
    },
    {
      label: 'Take away',
      info: '(Urquiza y Cánd. Pujato)',
      price: numbers.takeAwayCostNumber
    }
  ]
}
