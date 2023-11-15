import classes from './PhoneInput.module.css'
import { memo, useMemo } from 'react'
import { useValidatePhoneInput } from '../lib/useValidatePhoneInput'
import UserInput from '../lib/ui/UserInput'
import Dot from '../lib/ui/Dot'
import { usePhoneInputTexts } from '../lib/usePhoneInputTexts'

export default memo(function PhoneInput ({ isDetailsOpen }) {
  const {
    sanitizedInput: { sanitizedPhoneCharacteristic, sanitizedPhoneNumber },
    invalidInput,
    handlePhoneCharacteristic,
    handlePhoneNumber,
    inputStyle,
    isNumberTooShort,
    missingNumber: {
      missingPhoneCharacteristic,
      missingPhoneNumber
    }
  } = useValidatePhoneInput(isDetailsOpen)

  const {
    labelText,
    onInvalidText,
    onTooShortText,
    INITIAL_CHAR_NUM,
    INITIAL_PHONE_NUM
  } = usePhoneInputTexts()

  const uiDangerMessage = useMemo(() => {
    if (invalidInput) {
      return (
        <p className={classes.invalid_input_message}>
          {onInvalidText}
        </p>
      )
    }
    if (missingPhoneCharacteristic || missingPhoneNumber || (!invalidInput && isNumberTooShort)) {
      return (
        <p className={classes.invalid_input_message}>
          {onTooShortText}
        </p>
      )
    }
  }, [
    invalidInput,
    isNumberTooShort,
    onInvalidText,
    onTooShortText,
    missingPhoneCharacteristic,
    missingPhoneNumber
  ])

  return (
    <div
      style={inputStyle}
      className={classes.phone_input}
    >
      <label htmlFor='clientPhoneID'>
        <p className={classes.input_label}> <Dot /> {labelText} </p>
      </label>
      <section className={classes.numbers_section}>
        <div className={classes.phone_input_charact}>
          <span className={classes.number_initial_charact}>
            {INITIAL_CHAR_NUM}
          </span>
          <UserInput
            style={{
              width: '6.5rem'
            }}
            isInvalid={invalidInput || isNumberTooShort || missingPhoneCharacteristic}
            autoComplete='off'
            type='tel'
            id='clientPhoneID'
            maxLength={5}
            value={sanitizedPhoneCharacteristic}
            onChange={handlePhoneCharacteristic}
            onBlur={handlePhoneCharacteristic}
          />
        </div>
        <div className={classes.phone_input_phone}>
          <span className={classes.number_initial_phone}>
            {INITIAL_PHONE_NUM}
          </span>
          <UserInput
            style={{
              width: '100%'
            }}
            isInvalid={invalidInput || isNumberTooShort}
            autoComplete='off'
            type='tel'
            maxLength={9}
            value={sanitizedPhoneNumber}
            onChange={handlePhoneNumber}
            onBlur={handlePhoneNumber}
          />
        </div>
        {uiDangerMessage}
      </section>
    </div>
  )
})
