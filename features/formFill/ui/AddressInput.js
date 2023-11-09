import classes from './AddressInput.module.css'
import { i18n } from '@/shared/model/i18n'
import { memo, useRef, useState } from 'react'
import Triangle from '@/shared/ui/lib/svg/Triangle'
import inputClasses from '@/widgets/form/ClientDataForm.module.css'
import { useValidateAddressInput } from '../lib/useValidateAddressInput'

const { CLIENT_FORM } = i18n.LANG.ESP.UI

export default memo(function AddressInput ({ isDetailsOpen, setDetailsOpenState }) {
  const detailsRef = useRef(null)
  const [address, setAddress] = useState('')
  const [addressComments, setAddressComments] = useState('')
  const [{ sanitizedAddress, sanitizedComments }, invalidInput] = useValidateAddressInput({ address, addressComments })

  const handleDetailsToggle = e => setDetailsOpenState(e.target.open)
  const handleAddress = e => setAddress(e.target.value)
  const handleAddressComments = e => setAddressComments(e.target.value)
  const handleKeyPress = (e) => {
    const closePressedKey = e.key === 'Enter' || e.key === 'Tab'
    if (closePressedKey && detailsRef.current.open) {
      detailsRef.current.open = false
      setDetailsOpenState(false)
    }
  }

  return (
    <div className={`
    ${inputClasses.client_input} ${classes.address_input}
    `}
    >
      <label htmlFor='clientAddressID'>
        <p>{CLIENT_FORM.FIELD_ADDRESS.LABEL}</p>
      </label>
      <input
        required
        id='clientAddressID'
        type='text'
        value={sanitizedAddress || ''}
        onChange={handleAddress}
        onBlur={handleAddress}
      />
      {
        invalidInput && (
          <p className={classes.invalid_input_message}>
            {CLIENT_FORM.FIELD_ADDRESS.ON_INVALID}
          </p>
        )
      }
      {
          !invalidInput && (
            <details
              className={classes.detail}
              onToggle={handleDetailsToggle}
              ref={detailsRef}
            >
              <summary>
                <span>
                  <Triangle
                    width={10}
                    style={{
                      marginInlineEnd: '.5rem',
                      fill: 'white',
                      transform: `${isDetailsOpen ? 'rotate(180deg)' : 'rotate(90deg)'}`,
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
                onKeyDown={handleKeyPress}
                maxLength={120}
                placeholder='< 120 caract.'
                className={classes.textarea}
                id='textArea'
                autoFocus
                value={sanitizedComments || ''}
                onChange={handleAddressComments}
              />
            </details>
          )
      }
    </div>
  )
}
)
