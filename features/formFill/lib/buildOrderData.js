import { WHATSAPP_LINK } from './whatsAppLink'

export function buildOrderData (rawData) {
  const orderDataToSheets = {}
  let receipt
  let receiptNamePaymentMethod
  let address
  let orderID
  let stockUpdate = ''

  Array.from(rawData.entries()).forEach(([field, value]) => {
    if (field === 'paymentReceipt') {
      receipt = value
      return
    }

    if (field === 'orderID') {
      orderID = value
    }

    if (field === 'cart') {
      const cart = JSON.parse(value)
      const order = cart
        .flatMap(cartItem => {
          stockUpdate += `${cartItem.id}-${cartItem.quantity}//`
          return [cartItem.name, cartItem.quantity].join(' - ')
        })
        .join(' //\n ')
      orderDataToSheets.order = order
      return
    }

    if (field === 'clientWhatsApp') {
      orderDataToSheets[field] = `${WHATSAPP_LINK}${value}`
      return
    }

    if (field === 'clientAddress') {
      address = value
      return
    }

    if (field === 'clientComments') {
      orderDataToSheets.clientAddress = `${address}\n- ${value}`
      return
    }

    if (field === 'paymentMethod') {
      orderDataToSheets.payment = value
      receiptNamePaymentMethod = value
      return
    }

    if (field === 'stockUpdate') {
      orderDataToSheets.stockUpdate = stockUpdate
      return
    }
    orderDataToSheets[field] = value
  })

  const receiptNameTimestamp = orderDataToSheets.timestamp.slice(orderDataToSheets.timestamp.indexOf(', ') + 2)
  const receiptName = receipt && `${receiptNameTimestamp}-$${orderDataToSheets.total}-${receiptNamePaymentMethod}-${orderID}`
  orderDataToSheets.receiptName = receiptName ?? 'NO SE ADJUNTÓ COMPROBANTE'

  return [orderDataToSheets, { receipt, receiptName }]
}
