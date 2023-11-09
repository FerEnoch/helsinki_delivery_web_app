import classes from './PhoneInput.module.css'
import inputClasses from '@/widgets/form/ClientDataForm.module.css'
import { memo, useMemo, useState } from 'react'
import { i18n } from '@/shared/model/i18n'
import { useValidatePhoneInput } from '../lib/useValidatePhoneInput'

const { CLIENT_FORM: { FIELD_PHONE: { INITIAL_CHAR_NUM, INITIAL_PHONE_NUM, LABEL, ON_INVALID } } } = i18n.LANG.ESP.UI

export default memo(function PhoneInput ({ isDetailsOpen }) {
  const [phoneCaracteristic, setPhoneCaracteristic] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [{ sanitizedPhoneCaracteristic, sanitizedPhoneNumber }, invalidInput] = useValidatePhoneInput({ phoneCaracteristic, phoneNumber })

  const openDetailsPhoneInputStyle = useMemo(() => ({
    transition: `${isDetailsOpen ? 'all 250ms ease-in' : ''}`,
    paddingBlockStart: `${isDetailsOpen ? '2rem' : ''}`,
    zIndex: `${isDetailsOpen ? '-1' : ''}`
  }), [isDetailsOpen])

  return (
    <div
      style={openDetailsPhoneInputStyle}
      className={`
        ${inputClasses.client_input} 
        ${classes.phone_input}
        ${invalidInput ? classes.invalid_phone_input : ''}
      `}
    >
      <label htmlFor='clientPhoneID'>
        <p>{LABEL}</p>
      </label>
      <section className={classes.numbers_section}>
        <div className={classes.phone_input_caract}>
          <span className={classes.number_initial_caract}>
            {INITIAL_CHAR_NUM}
          </span>
          <input
            style={{
              width: '5rem'
            }}
            required
            autoComplete='off'
            id='clientPhoneID'
            type='text'
            inputMode='numeric'
            pattern={() => encodeURIComponent('[0-9]{3, 5}')}
            maxLength={5}
            value={sanitizedPhoneCaracteristic}
            onChange={(e) => setPhoneCaracteristic(e.target.value)}
            onBlur={(e) => setPhoneCaracteristic(e.target.value)}
          />
        </div>
        <div className={classes.phone_input_phone}>
          <span className={classes.number_initial_phone}>
            {INITIAL_PHONE_NUM}
          </span>
          <input
            style={{
              width: '8rem'
            }}
            required
            autoComplete='off'
            type='text'
            inputMode='numeric'
            pattern={() => encodeURIComponent('[0-9]{7, 9}')}
            maxLength={9}
            value={sanitizedPhoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onBlur={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        {
        invalidInput && (
          <p className={classes.invalid_input_message}>
            {ON_INVALID}
          </p>
        )
      }
      </section>
    </div>
  )
})
