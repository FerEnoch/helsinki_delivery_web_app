import confetti from 'canvas-confetti'
import { timeFormatter } from '@/shared/lib/timeFormat'
import classes from './ClientDataForm.module.css'
import { useRef, useState } from 'react'
import { sendOrderData } from '../model/sendOrderData'
import { useAppStore } from '@/entities/lib/store'

export default function ClientDataForm () {
  const fileRef = useRef()
  const { paymentMethod, getCartTotalAmount, cart } = useAppStore()
  const [clientName, setClientName] = useState('')
  const [clientAddress, setClientAddress] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientComments, setClientComments] = useState('')

  const clearFormData = () => {
    setClientName('')
    setClientAddress('')
    setClientPhone('')
    setClientComments('')
  }

  const submitHandler = async (e) => {
    e.preventDefault()
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
     *  8 - orderID
     *  9 - stockUpdate
     */
    const date = new Date()
    formData.set('timestamp', timeFormatter(date))

    formData.set('clientName', clientName)
    formData.set('clientPhone', clientPhone)
    formData.set('clientAddress', clientAddress)
    formData.set('clientComments', clientComments)

    formData.set('cart', JSON.stringify(cart))
    formData.set('total', getCartTotalAmount())
    formData.set('paymentMethod', paymentMethod.label)
    formData.set('paymentState', 'pendiente') // siempre pago es pendiente hasta controlar el comprobante
    formData.set('orderID', crypto.randomUUID().slice(0, 8))
    formData.set('stockUpdate', '')

    const { fileInputID } = e.target
    if (fileInputID.value) {
      const paymentReceipt = fileRef.current.files[0]
      formData.set('paymentReceipt', paymentReceipt)
    }

    const { message } = await sendOrderData(formData)
    if (message === 'success') {
      confetti()
      clearFormData()
    }
  }

  return (
    <form
      className={classes.form_container}
      onSubmit={submitHandler}
    >
      <header className={classes.form_header}>
        <h3>Tus datos para el envío</h3>
      </header>
      <section className={classes.form_main}>
        <div className={classes.client_input}>
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
        <div className={classes.client_input}>
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
          <details className={classes.detail}>
            <summary>Información extra</summary>
            <label htmlFor='textArea'>
              <p>¿Alguna información extra o aclaración que necesitemos saber para el envío?</p>
            </label>
            <textarea
              maxLength={120}
              placeholder='Ser claro y conciso por favor'
              className={classes.textarea}
              id='textArea'
              autoFocus
              value={clientComments}
              onChange={(e) => setClientComments(e.target.value)}
            />
          </details>
        </div>
        <div className={classes.client_input}>
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
      <section className={classes.form_file_upload}>
        <div className={classes.client_input}>
          <label htmlFor='fileInputID'>
            <p>Adjunta tu recibo de pago</p>
          </label>
          <input
            name='fileInput'
            id='fileInputID'
            type='file'
            ref={fileRef}
            accept='image/*'
          />
        </div>
      </section>
      <footer className={classes.form_footer}>
        <button
          disabled={!clientName || !clientAddress}
          type='submit'
          className={classes.submit_button}
        >
          <p>Enviar pedido</p>
        </button>
      </footer>
    </form>
  )
}
