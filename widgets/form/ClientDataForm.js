import confetti from 'canvas-confetti'
import { timeFormatter } from '@/shared/lib/timeFormat'
import classes from './ClientDataForm.module.css'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { sendOrderData } from '@/features/formFill/model/sendOrderData'
import { useAppStore } from '@/entities/lib/store'
import { useRouter } from 'next/navigation'
import { i18n } from '@/shared/model/i18n'
import NameInput from '@/features/formFill/ui/NameInput'
import AddressInput from '@/features/formFill/ui/AddressInput'
import PhoneInput from '@/features/formFill/ui/PhoneInput'
import FormFooter from '@/features/formFill/ui/FormFooter'
import ReceiptInput from '@/features/formFill/ui/ReceiptInput'
import { FORM_FIELDS } from '@/features/formFill/config/formFieldsOrder'
import { useShowReceiptRequiredMessage } from '@/features/formFill/lib/useShowReceiptRequiredMessage'
/**
 * TO DO - handle api error
 */
const { CLIENT_FORM, ORDER_PROCESSING, ORDER_SUCCESS } = i18n.LANG.ESP.UI

export default memo(function ClientDataForm ({ closeDialog, disableButton, showContinueShoppingButton }) {
  const fileRef = useRef()
  const router = useRouter()
  const [openDetails, setOpenDetails] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [successfullOrderSending, setSuccessfullOrderSending] = useState(false)
  const { showReceiptRequiredMessage } = useShowReceiptRequiredMessage()
  const {
    paymentMethod: { label: method, receipt },
    getCartTotalAmount,
    cart,
    clearCart,
    clearPaymentSlice,
    client,
    clearClientData
  } = useAppStore()

  const isDetailsOpen = useCallback((openState) => setOpenDetails(openState), [])

  const openDetailsPhoneInputStyle = useMemo(() => ({
    transition: `${openDetails ? 'all 250ms ease-in' : ''}`,
    paddingBlockStart: `${openDetails ? '2rem' : ''}`,
    zIndex: `${openDetails ? '-1' : ''}`
  }), [openDetails])

  const successHandler = useCallback(() => {
    setIsLoading(false)
    setSuccessfullOrderSending(true)
    confetti()
    clearClientData()
    clearCart()
    clearPaymentSlice()
    setTimeout(() => {
      router.push('/')
      closeDialog()
    }, 7000)
  }, [clearClientData, clearCart, clearPaymentSlice, closeDialog, router])

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData()
    const date = new Date()
    formData.set(FORM_FIELDS.TIMESTAMP, timeFormatter(date))
    formData.set(FORM_FIELDS.CLIENT_ADDRESS, client?.address.trim())
    formData.set(FORM_FIELDS.CLIENT_COMMENTS, client?.addressComments.trim())
    formData.set(FORM_FIELDS.ORDER, JSON.stringify(cart))
    formData.set(FORM_FIELDS.CLIENT_PHONE, client?.phone.trim())
    formData.set(FORM_FIELDS.CLIENT_NAME, client?.name.trim())
    formData.set(FORM_FIELDS.PAYMENT_METHOD, method)
    formData.set(FORM_FIELDS.TOTAL, getCartTotalAmount())
    formData.set(FORM_FIELDS.CLIENT_WHATSAPP, client?.phone.trim())
    formData.set(FORM_FIELDS.PAYMENT_STATE, 'pendiente') // alwalys pending-state until the receipt is ckecked manually
    formData.set(FORM_FIELDS.RECEIPT_NAME, '')
    formData.set(FORM_FIELDS.STOCK_UPDATE, '')
    formData.set(FORM_FIELDS.ORDER_ID, crypto.randomUUID().slice(0, 8))

    if (isReceiptRequired) {
      const { fileInputID } = e.target
      if (fileInputID.value) {
        const paymentReceipt = fileRef.current.files[0]
        formData.set(FORM_FIELDS.PAYMENT_RECEIPT.label, paymentReceipt)
      } else {
        showReceiptRequiredMessage()
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
  }

  const formTitle = CLIENT_FORM.FORM_TITLE.toUpperCase()
  const isReceiptRequired = receipt === 'REQUIRED'
  const submitButtonDisabled = !client?.name || !client?.address || !client?.phone
  const showReceiptInput = isReceiptRequired && !isLoading && !successfullOrderSending
  const processingOrderTitle = ORDER_PROCESSING.title.toUpperCase()
  const processingOrderMessage = ORDER_PROCESSING.message

  useEffect(() => {
    disableButton(isLoading)
  }, [isLoading, disableButton])

  useEffect(() => {
    showContinueShoppingButton(successfullOrderSending)
  }, [successfullOrderSending, showContinueShoppingButton])

  return (
    <form
      onSubmit={submitHandler}
      className={`
          ${classes.form_container}
          ${isLoading ? classes.form_container_loading : ''}
          ${successfullOrderSending ? classes.form_container_success : ''}
        `}
    >
      <header className={classes.form_header}>
        <h3>
          {
        isLoading && !successfullOrderSending
          ? ''
          : !successfullOrderSending && formTitle
          }
        </h3>
      </header>
      <section className={classes.form_main}>
        {
        isLoading && !successfullOrderSending
          ? (
            <div className={classes.processing_texts_wrapper}>
              <h1>{processingOrderTitle}</h1>
              <p>{processingOrderMessage}</p>
            </div>
            )
          : (
              successfullOrderSending && !isLoading
                ? (
                  <>
                    <h1>{ORDER_SUCCESS.title}</h1>
                    <p>{ORDER_SUCCESS.message}</p>
                  </>
                  )
                : (
                  <>
                    <NameInput />
                    <AddressInput
                      detailsOpen={isDetailsOpen}
                    />
                    <PhoneInput
                      detailsOpen={openDetails}
                      style={openDetailsPhoneInputStyle}
                    />
                  </>
                  )
            )
        }
      </section>
      {
       showReceiptInput && <ReceiptInput ref={fileRef} />
      }
      <FormFooter
        loadingState={isLoading && !successfullOrderSending}
        successState={successfullOrderSending && !isLoading}
        buttonDisabled={submitButtonDisabled}
      />
    </form>
  )
}
)
