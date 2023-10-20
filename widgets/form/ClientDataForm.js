import confetti from 'canvas-confetti'
import { timeFormatter } from '@/shared/lib/timeFormat'
import classes from './ClientDataForm.module.css'
import { useCallback, useRef, useState } from 'react'
import { sendOrderData } from '@/features/formFill/model/sendOrderData'
import { useAppStore } from '@/entities/lib/store'
import { useRouter } from 'next/navigation'
import { i18n } from '@/shared/model/i18n'
import NameInput from '@/features/formFill/ui/NameInput'
import AddressInput from '@/features/formFill/ui/AddressInput'
import PhoneInput from '@/features/formFill/ui/PhoneInput'
import SubmitFormButton from '@/features/formFill/ui/SubmitFormButton'

const { CLIENT_FORM } = i18n.LANG.ESP.UI

export default function ClientDataForm ({ closeDialog }) {
  const fileRef = useRef()
  const router = useRouter()
  const {
    paymentMethod: { label: method, recipe },
    getCartTotalAmount,
    cart,
    clearCart,
    clearPaymentMethod,
    client,
    clearClientData
  } = useAppStore()

  const [openDetails, setOpenDetails] = useState(false)
  const [showMessageRecipeRequired, setShowMessageRecipeRequired] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isRecipeRequired = recipe === 'REQUIRED'

  const isDetailsOpen = useCallback((openState) => setOpenDetails(openState), [])

  const openDetailsPhoneInputStyle = {
    transition: `${openDetails ? 'all 250ms ease-in' : ''}`,
    paddingBlockStart: `${openDetails ? '2rem' : ''}`,
    zIndex: `${openDetails ? '-1' : ''}`
  }

  const submitButtonDisabled = !client?.name || !client?.address || !client?.phone

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData()
    /**
     * Carefull with the order becouse It's the order they will be displayed in g-sheets
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
    const date = new Date()
    formData.set('timestamp', timeFormatter(date))
    formData.set('clientAddress', client?.address.trim())
    formData.set('clientComments', client?.addressComments.trim())
    formData.set('cart', JSON.stringify(cart))
    formData.set('clientPhone', client?.phone.trim())
    formData.set('clientName', client?.name.trim())
    formData.set('paymentMethod', method)
    formData.set('total', getCartTotalAmount())
    formData.set('clientWhatsApp', client?.phone.trim())
    formData.set('paymentState', 'pendiente') // alwalys pending-state until the receipt is ckecked manually
    formData.set('receiptName', '')
    formData.set('stockUpdate', '')
    formData.set('orderID', crypto.randomUUID().slice(0, 8))

    if (isRecipeRequired) {
      const { fileInputID } = e.target
      if (fileInputID.value) {
        const paymentReceipt = fileRef.current.files[0]
        formData.set('paymentReceipt', paymentReceipt)
      } else {
        setShowMessageRecipeRequired(true)
        return
      }
    }

    const { message } = await sendOrderData(formData)
    if (message === 'success') {
      clearClientData()
      clearCart()
      clearPaymentMethod()
      closeDialog()
      confetti()
      router.push('/')
    } else {
      /** retrying.. */
      const { message } = await sendOrderData(formData)
      if (message === 'success') {
        setIsLoading(false)
        clearClientData()
        clearCart()
        clearPaymentMethod()
        closeDialog()
        confetti()
        router.push('/')
      } else {
        console.log(message)
        throw new Error()
      }
    }
  }

  return (
    <form
      className={`${classes.form_container} ${isLoading ? classes.form_container_loading : ''}`}
      onSubmit={submitHandler}
    >
      <header className={classes.form_header}>
        <h3>{CLIENT_FORM.FORM_TITLE.toUpperCase()}</h3>
      </header>
      <section className={classes.form_main}>
        <NameInput />
        <AddressInput
          detailsOpen={isDetailsOpen}
        />
        <PhoneInput
          detailsOpen={openDetails}
          style={openDetailsPhoneInputStyle}
        />
      </section>
      {
       isRecipeRequired && !isLoading && (
         <section className={classes.form_file_upload}>
           <div className={`${classes.client_input} ${classes.receipt_input}`}>
             <label htmlFor='fileInputID'>
               <p>{CLIENT_FORM.FIELD_RECEIPT.LABEL}</p>
             </label>
             <input
               onInvalid={() => setShowMessageRecipeRequired(true)}
               onChange={() => setShowMessageRecipeRequired(false)}
               ref={fileRef}
               required
               name='fileInput'
               id='fileInputID'
               type='file'
               accept='image/*'
             />
             {
              showMessageRecipeRequired && (
                <p className={classes.invalid_input_message}>
                  {CLIENT_FORM.FIELD_RECEIPT.ON_INVALID}
                </p>
              )
             }
           </div>
         </section>
       )
      }
      <SubmitFormButton
        isLoading={isLoading}
        disabled={submitButtonDisabled}
      />
      {/* <footer className={classes.form_footer}>
        {
          isLoading
            ? (
              <div className={classes.loading_logo_wrapper}>
                <HelsinkiLogo
                  className={classes.SVGLogo}
                  width={100}
                  height={100}
                  pathStyle={{ fill: '#eee', fillOpacity: 0.9 }}
                />
              </div>
              )
            : (
              <button
                disabled={submitButtonDisabled}
                type='submit'
                className={classes.submit_button}
              >
                <p>{CLIENT_FORM.FORM_SUBMIT}</p>
              </button>
              )
          }
      </footer> */}
    </form>
  )
}
