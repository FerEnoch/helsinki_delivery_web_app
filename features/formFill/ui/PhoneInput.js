import classes from './PhoneInput.module.css'
import inputClasses from '@/widgets/form/ClientDataForm.module.css'
import { useEffect, useState } from 'react'
import { i18n } from '@/shared/model/i18n'
import { useAppStore } from '@/entities/lib/store'

const { CLIENT_FORM } = i18n.LANG.ESP.UI

export default function PhoneInput ({ style }) {
  const [completePhoneInput, setCompletePhoneInput] = useState('')
  const [phoneCaracteristic, setPhoneCaracteristic] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const { setClientPhone } = useAppStore()

  useEffect(() => {
    setClientPhone(completePhoneInput)
  }, [completePhoneInput, setClientPhone])

  useEffect(() => {
    const completePhone = `${phoneCaracteristic}${phoneNumber}`
    setCompletePhoneInput(completePhone)
  }, [phoneCaracteristic, phoneNumber])

  return (
    <div style={style} className={`${inputClasses.client_input} ${classes.phone_input}`}>
      <label htmlFor='clientPhoneID'>
        <p>{CLIENT_FORM.FIELD_PHONE}</p>
      </label>
      <section className={classes.numbers_section}>
        <div className={classes.phone_input_cacact}>
          <span className={classes.number_initial_caract}>0</span>
          <input
            style={{
              width: '5rem'
            }}
            required
            autoComplete='off'
            id='clientPhoneID'
            type='number'
            maxLength={5}
            value={phoneCaracteristic}
            onChange={(e) => setPhoneCaracteristic(e.target.value)}
          />
        </div>
        <div className={classes.phone_input_phone}>
          <span className={classes.number_initial_phone}>15</span>
          <input
            style={{
              width: '8rem'
            }}
            required
            autoComplete='off'
            type='number'
            maxLength={9}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </section>
    </div>
  )
}
