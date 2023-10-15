export function buildOrderData (rawData) {
  const orderDataToSheets = {}
  let receipt
  let address
  let payment

  Array.from(rawData.entries()).forEach(([field, value]) => {
    if (field === 'paymentReceipt') {
      receipt = value
      return
    }
    if (field === 'cart') {
      const cart = JSON.parse(value)
      const order = cart
        .flatMap(cartItem => {
          // orderDataToSheets.stockUpdate = `${cartItem.id} - ${cartItem.quantity}`
          return [cartItem.name, cartItem.quantity].join(' - ')
        })
        .join(' //\n ')
      orderDataToSheets.order = order
      return
    }
    if (field === 'clientAddress') {
      address = value
      return
    }
    if (field === 'clientComments') {
      orderDataToSheets.clientAddress = `${address} - ${value}`
      return
    }
    if (field === 'paymentMethod') {
      payment = value
      return
    }
    if (field === 'paymentState') {
      orderDataToSheets.payment = `${payment} - ${value}`
      return
    }
    orderDataToSheets[field] = value
  })

  return [orderDataToSheets, receipt]
}
