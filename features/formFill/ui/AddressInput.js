import classes from './AddressInput.module.css'
import { i18n } from '@/shared/model/i18n'
import { useEffect, useRef, useState } from 'react'
import Triangle from '@/shared/ui/lib/svg/Triangle'
// import { useAppStore } from '@/entities/lib/store'
import inputClasses from '@/widgets/form/ClientDataForm.module.css'
import { useValidateAddressInput } from '../lib/useValidateAddressInput'

const { CLIENT_FORM } = i18n.LANG.ESP.UI

export default function AddressInput ({ detailsOpen }) {
  const detailsRef = useRef(null)
  const [address, setAddress] = useState('')
  const [addressComments, setAddressComments] = useState('')
  const [openDetails, setOpenDetails] = useState(false)
  const [{ sanitizedAddress, sanitizedComments }, invalidInput] = useValidateAddressInput({ address, addressComments })

  useEffect(() => {
    detailsOpen(openDetails)
  }, [openDetails, detailsOpen])

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && detailsRef.current.open) {
      detailsRef.current.open = false
      setOpenDetails(false)
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
        onChange={(e) => setAddress(e.target.value)}
        onBlur={(e) => setAddress(e.target.value)}
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
              onToggle={(e) => setOpenDetails(e.target.open)}
              ref={detailsRef}
            >
              <summary>
                <span>
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
                onKeyDown={handleKeyPress}
                maxLength={120}
                placeholder='< 120 caract.'
                className={classes.textarea}
                id='textArea'
                autoFocus
                value={sanitizedComments || ''}
                onChange={(e) => setAddressComments(e.target.value)}
              />
            </details>
          )
      }
    </div>
  )
}
