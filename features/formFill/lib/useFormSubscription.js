import confetti from 'canvas-confetti'
import { useAppStore } from '@/entities/lib/store'
import { useFormModal } from './useFormModal'
import { useShowReceiptRequiredMessage } from './useShowReceiptRequiredMessage'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { FORM_FIELDS } from '../config/formFieldsOrder'
import { timeFormatter } from '@/shared/lib/timeFormat'
import { sendOrderData } from '../model/sendOrderData'

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
  RECEIPT_NAME,
  STOCK_UPDATE,
  ORDER_ID
} = FORM_FIELDS

export function useFormSubscription (fileRef) {
  const {
    paymentMethod: { label: method, receipt },
    getCartTotalAmount,
    cart,
    clearCart,
    clearPaymentSlice,
    client,
    clearClientData
  } = useAppStore()
  const { closeFormDialog } = useFormModal()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [successfullOperation, setSuccessfullOperation] = useState(false)
  const [isReceiptRequired, setIsReceiptRequired] = useState(undefined)

  useEffect(() => {
    setIsReceiptRequired(receipt === 'REQUIRED')
  }, [receipt])

  const successHandler = useCallback(() => {
    setIsLoading(false)
    setSuccessfullOperation(true)
    confetti()
    clearClientData()
    clearCart()
    clearPaymentSlice()
    setTimeout(() => {
      router.push('/')
      closeFormDialog()
    }, 7000)
  }, [clearClientData, clearCart, clearPaymentSlice, closeFormDialog, router])

  const submitHandler = useCallback(async (e) => {
    e.preventDefault()
    setIsLoading(true)
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

    if (isReceiptRequired) {
      const { fileInputID } = e.target
      if (fileInputID.value) {
        const paymentReceipt = fileRef.current.files[0]
        formData.set(FORM_FIELDS.PAYMENT_RECEIPT.label, paymentReceipt)
      } else {
        return
      }
    }

    const { message } = await sendOrderData(formData)
    if (message === 'success') return successHandler()
    console.log(message)
    throw new Error()
    /**
     * handle error!
     */
  }, [client, cart, fileRef, getCartTotalAmount, method, isReceiptRequired, successHandler])

  return {
    isLoading,
    successfullOperation,
    isReceiptRequired,
    submitHandler
  }
}
