import confetti from 'canvas-confetti'
import { useAppStore } from '@/entities/lib/store'
import { FORM_FIELDS } from '../config/formFieldsOrder'
import { timeFormatter } from '@/shared/lib/timeFormat'
import { sendOrderData } from '../model/sendOrderData'
import { ORDER_OPERATION_TIME } from '../config/orderOperationTime'

const {
  TIMESTAMP,
  CLIENT_ADDRESS,
  CLIENT_COMMENTS,
  ORDER,
  CLIENT_PHONE,
  CLIENT_NAME,
  PAYMENT_METHOD,
  TOTAL,
  CLIENT_WHATSAPP,
  PAYMENT_STATE,
  PAYMENT_RECEIPT: { label: receiptLabel },
  RECEIPT_NAME,
  STOCK_UPDATE,
  ORDER_ID
} = FORM_FIELDS

const { PROCESSING_MIN_TIME_MS } = ORDER_OPERATION_TIME

export function useFormSubscription () {
  const {
    paymentMethod: { label: method, receipt },
    getCartTotalAmount,
    cart,
    clearCart,
    clearPaymentSlice,
    client,
    clearClientData,
    receiptFile,
    deleteReceiptFile,
    setFormLoadingState,
    setFormSuccessfulSubmitOperation
  } = useAppStore()

  const successHandler = () => {
    setTimeout(() => {
      setFormSuccessfulSubmitOperation(true)
      setFormLoadingState(false)
      clearClientData()
      clearCart()
      clearPaymentSlice()
      deleteReceiptFile()
      confetti()
    }, PROCESSING_MIN_TIME_MS)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setFormLoadingState(true)

    const formData = new FormData()
    const date = new Date()

    formData.set(TIMESTAMP, timeFormatter(date))
    formData.set(CLIENT_ADDRESS, client?.address.trim())
    formData.set(CLIENT_COMMENTS, client?.addressComments.trim())
    formData.set(ORDER, JSON.stringify(cart))
    formData.set(CLIENT_PHONE, client?.phone.trim())
    formData.set(CLIENT_NAME, client?.name.trim())
    formData.set(PAYMENT_METHOD, method)
    formData.set(TOTAL, getCartTotalAmount())
    formData.set(CLIENT_WHATSAPP, client?.phone.trim())
    formData.set(PAYMENT_STATE.label, PAYMENT_STATE.state)
    formData.set(RECEIPT_NAME, '')
    formData.set(STOCK_UPDATE, '')
    formData.set(ORDER_ID, crypto.randomUUID().slice(0, 8))

    if (receipt === 'REQUIRED') {
      const { fileInputID } = e.target
      if (fileInputID.value) {
        formData.set(receiptLabel, receiptFile)
      }
    }

    const { message } = await sendOrderData(formData)
    if (message === 'success') return successHandler()
    console.log(message)
    throw new Error()
    /**
     * handle error!
     */
  }

  return {
    submitHandler
  }
}
