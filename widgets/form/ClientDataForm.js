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
  // const [clientName, setClientName] = useState('')
  // const [clientAddress, setClientAddress] = useState('')
  // const [clientComments, setClientComments] = useState('')

  // const [clientPhone, setClientPhone] = useState('')
  const [openDetails, setOpenDetails] = useState(false)
  const [showMessageRecipeRequired, setShowMessageRecipeRequired] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // const client = getClient()

  const isRecipeRequired = recipe === 'REQUIRED'
  const isDetailsOpen = useCallback((openState) => setOpenDetails(openState), [])
  const openDetailsPhoneInputStyle = {
    transition: `${openDetails ? 'all 250ms ease-in' : ''}`,
    paddingBlockStart: `${openDetails ? '2rem' : ''}`,
    zIndex: `${openDetails ? '-1' : ''}`
  }
  const submitButtonDisabled = !client?.name || !client?.address || !client?.phone
  // const clearFormData = () => {
  //   setClientName('')
  //   setClientAddress('')
  //   setClientPhone('')
  //   setClientComments('')
  // }

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData()
    /**
     * Carefull with the order becouse It's the order they will be displayed in g-sheets
     *  1 - timestamp
     *  2 - clientName
     *  3 - clientPhone
     *  4 - client WhatsApp
     *  5 - clientAddress - comments
     *  6 - order
     *  7 - total
     *  8 - paymentMethod - paymentState
     *  9 - receipt file name
     * 10 - stockUpdate
     * 11 - orderID
     */
    const date = new Date()
    formData.set('timestamp', timeFormatter(date))

    formData.set('clientName', client?.name)
    formData.set('clientPhone', client?.phone)
    formData.set('clientWhatsApp', client?.phone)
    formData.set('clientAddress', client?.address)
    formData.set('clientComments', client?.addressComments)

    formData.set('cart', JSON.stringify(cart))
    formData.set('total', getCartTotalAmount())
    formData.set('paymentMethod', method)
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
        {/* <div className={`${classes.client_input} ${classes.name_input}`}>
          <label htmlFor='clientNameID'>
            <p>{CLIENT_FORM.FIELD_NAME}</p>
          </label>
          <input
            required
            name='clientName'
            id='clientNameID'
            type='text'
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div> */}
        {/* <div className={`${classes.client_input} ${classes.address_input}`}>
          <label htmlFor='clientAddressID'>
            <p>{CLIENT_FORM.FIELD_ADDRESS.LABEL}</p>
          </label>
          <input
            required
            name='clientAddress'
            id='clientAddressID'
            type='text'
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
          />
          <details className={classes.detail} onToggle={(e) => setOpenDetails(e.target.open)}>
            <summary>
              <span className={classes.toggle_details_triangle}>
                <Triangle
                  width={10}
                  style={{
                    marginInlineEnd: '.5rem',
                    fill: 'white',
                    transform: `${openDetails ? 'rotate(180deg)' : 'rotate(90deg)'}`,
                    transition: 'all 150ms ease-in-out'
                  }}
                />
              </span>
              {CLIENT_FORM.FIELD_ADDRESS.EXTRA_INFO}
            </summary>
            <label htmlFor='textArea'>
              <p>{CLIENT_FORM.FIELD_ADDRESS.SUMMARY}</p>
            </label>
            <textarea
              maxLength={120}
              placeholder='< 120 caract.'
              className={classes.textarea}
              id='textArea'
              autoFocus
              value={clientComments}
              onChange={(e) => setClientComments(e.target.value)}
            />
          </details>
        </div> */}
        {/* <div className={`${classes.client_input} ${openDetails ? classes.phone_input_under : ''}`}>
          <label htmlFor='clientPhone'>
            <p>{CLIENT_FORM.FIELD_PHONE}</p>
          </label>
          <input
            required
            name='clientPhone'
            id='clientPhoneID'
            type='number'
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
          />
        </div> */}
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
