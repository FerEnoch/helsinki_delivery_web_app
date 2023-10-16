import confetti from 'canvas-confetti'
import { timeFormatter } from '@/shared/lib/timeFormat'
import classes from './ClientDataForm.module.css'
import { useRef, useState } from 'react'
import { sendOrderData } from '../model/sendOrderData'
import { useAppStore } from '@/entities/lib/store'
import { useRouter } from 'next/navigation'
import Triangle from '@/shared/ui/lib/svg/Triangle'
import HelsinkiLogo from '@/shared/ui/lib/svg/HelsinkiLogo'

export default function ClientDataForm ({ closeDialog }) {
  const fileRef = useRef()
  const router = useRouter()
  const {
    paymentMethod: { label: method, recipe },
    getCartTotalAmount,
    cart,
    clearCart,
    clearPaymentMethod
  } = useAppStore()
  const [clientName, setClientName] = useState('')
  const [clientAddress, setClientAddress] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientComments, setClientComments] = useState('')
  const [openDetails, setOpenDetails] = useState(false)
  const [showMessageRecipeRequired, setShowMessageRecipeRequired] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isRecipeRequired = recipe === 'REQUIRED'

  const clearFormData = () => {
    setClientName('')
    setClientAddress('')
    setClientPhone('')
    setClientComments('')
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData()
    /**
     * Carefull with the order becouse It's the order they will be displayed in g-sheets
     *  1 - timestamp
     *  2 - clientName
     *  3 - clientPhone
     *  4 - clientAddress - comments
     *  5 - order
     *  6 - total
     *  7 - paymentMethod - paymentState
     *  8 - receipt file name
     *  9 - stockUpdate
     * 10 - orderID
     */
    const date = new Date()
    formData.set('timestamp', timeFormatter(date))

    formData.set('clientName', clientName)
    formData.set('clientPhone', clientPhone)
    formData.set('clientAddress', clientAddress)
    formData.set('clientComments', clientComments)

    formData.set('cart', JSON.stringify(cart))
    formData.set('total', getCartTotalAmount())
    formData.set('paymentMethod', method)
    formData.set('paymentState', 'pendiente') // siempre el pago es pendiente hasta controlar el comprobante
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
      clearFormData()
      clearCart()
      clearPaymentMethod()
      closeDialog()
      confetti({ particleCount: 80 })
      router.push('/')
    } else {
      /** retrying.. */
      const { message } = await sendOrderData(formData)
      if (message === 'success') {
        setIsLoading(false)
        clearFormData()
        clearCart()
        clearPaymentMethod()
        closeDialog()
        confetti({ particleCount: 80 })
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
        <h3>Tus datos para el envío</h3>
      </header>
      <section className={classes.form_main}>
        <div className={`${classes.client_input} ${classes.name_input}`}>
          <label htmlFor='clientNameID'>
            <p>Tu nombre</p>
          </label>
          <input
            required
            name='clientName'
            id='clientNameID'
            type='text'
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>
        <div className={`${classes.client_input} ${classes.address_input}`}>
          <label htmlFor='clientAddressID'>
            <p>Dónde te lo llevamos?</p>
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
              AÑADIR INFORMACIÓN EXTRA
            </summary>
            <label htmlFor='textArea'>
              <p>¿Alguna información extra o aclaración que necesitemos saber para el envío?</p>
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
        </div>
        <div className={`${classes.client_input} ${openDetails ? classes.phone_input_under : ''}`}>
          <label htmlFor='clientPhone'>
            <p>Dejanos un teléfono</p>
          </label>
          <input
            required
            name='clientPhone'
            id='clientPhoneID'
            type='text'
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
          />
        </div>
      </section>
      {
       isRecipeRequired && (
         <section className={classes.form_file_upload}>
           <div className={`${classes.client_input} ${classes.receipt_input}`}>
             <label htmlFor='fileInputID'>
               <p>Adjunta tu recibo de pago</p>
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
                  ** Por favor adjunta el comprobante de pago
                </p>
              )
             }
           </div>
         </section>
       )
      }
      <footer className={classes.form_footer}>
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
                disabled={!clientName || !clientAddress || !clientPhone}
                type='submit'
                className={classes.submit_button}
              >
                <p>ENVIAR PEDIDO</p>
              </button>
              )
          }
      </footer>
    </form>
  )
}
