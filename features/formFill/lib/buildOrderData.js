import { FORM_FIELDS } from '../config/formFieldsOrder'
import { sanitizeOrderDataField } from './sanitizeOrderDataField'
import { WHATSAPP_LINK } from './whatsAppLink'

export function buildOrderData (rawData) {
  const orderDataToSheets = {}
  let receipt
  let receiptNamePaymentMethod
  let address
  let orderID
  let stockUpdate = ''

  Array.from(rawData.entries()).forEach(([field, value]) => {
    const sanitizedValue = sanitizeOrderDataField({ field, value })

    if (field === FORM_FIELDS.PAYMENT_RECEIPT.label) {
      receipt = sanitizedValue
      return
    }

    if (field === FORM_FIELDS.ORDER_ID) {
      orderID = sanitizedValue
      return
    }

    if (field === FORM_FIELDS.ORDER) {
      const cart = JSON.parse(sanitizedValue)
      const order = cart
        .flatMap(cartItem => {
          stockUpdate += `${cartItem.id}-${cartItem.quantity}//`
          return [cartItem.name, cartItem.quantity].join(' - ')
        })
        .join('\n')
      orderDataToSheets.order = order
      return
    }

    if (field === FORM_FIELDS.CLIENT_WHATSAPP) {
      orderDataToSheets[field] = `${WHATSAPP_LINK}${sanitizedValue}`
      return
    }

    if (field === FORM_FIELDS.CLIENT_ADDRESS) {
      address = sanitizedValue
      return
    }

    if (field === FORM_FIELDS.CLIENT_COMMENTS) {
      orderDataToSheets.clientAddress = `${address}\n- ${sanitizedValue}`
      return
    }

    if (field === FORM_FIELDS.PAYMENT_METHOD) {
      orderDataToSheets.payment = sanitizedValue
      receiptNamePaymentMethod = sanitizedValue
      return
    }

    if (field === FORM_FIELDS.STOCK_UPDATE) {
      orderDataToSheets.stockUpdate = stockUpdate
      return
    }
    orderDataToSheets[field] = sanitizedValue
  })

  const receiptNameTimestamp = orderDataToSheets.timestamp.slice(orderDataToSheets.timestamp.indexOf(', ') + 2)
  const receiptName = receipt && `${receiptNameTimestamp}-$${orderDataToSheets.total}-${receiptNamePaymentMethod}-${orderID}`
  orderDataToSheets.receiptName = receiptName ?? FORM_FIELDS.PAYMENT_RECEIPT.no_receipt_message

  return [orderDataToSheets, { receipt, receiptName }]
}
