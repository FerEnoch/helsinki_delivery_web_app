import { i18n } from '@/shared/model/i18n'

/**
 * The form fields IN THE ORDER they will be displayed in g-sheets
*  1 - timestamp
*  2 - clientAddress - comments
*  3 - order
*  4 - clientPhone
*  5 - clientName
*  6 - paymentMethod
*  7 - total
*  8 - client WhatsApp
*  9 - paymentState
* 10 - receipt file name
* 11 - stockUpdate
* 12 - orderID
*/
const { ORDER } = i18n.LANG.ESP.G_DRIVE_UI

export const FORM_FIELDS = {
  TIMESTAMP: 'timestamp', // Día y horario
  CLIENT_ADDRESS: 'clientAddress', // Dirección
  CLIENT_COMMENTS: 'clientComments',
  TAKE_AWAY: ORDER.TAKE_AWAY_MESSAGE,
  ORDER: 'order', // Pedido
  CLIENT_PHONE: 'clientPhone', // Teléfono
  CLIENT_NAME: 'clientName', // Nombre
  PAYMENT_METHOD: 'paymentMethod', // Pago
  TOTAL: 'total', // Total
  CLIENT_WHATSAPP: 'clientWhatsApp', // WhatsApp
  PAYMENT_STATE: {
    label: 'paymentState', // Estado
    state: 'pendiente' // Siempre debe ser 'pendiente', ya que se utiliza para el programa de control de stock
  },
  RECEIPT_NAME: 'receiptName', // Comprobante
  STOCK_UPDATE: 'stockUpdate', // Actualización de stock
  ORDER_ID: 'orderID', // ID
  PAYMENT_RECEIPT: {
    label: 'paymentReceipt',
    no_receipt_message: ORDER.NO_RECEIPT_MESSAGE.toUpperCase()
  }
}
