import classes from './AddressInput.module.css'
import { i18n } from '@/shared/model/i18n'
import { memo, useRef, useState } from 'react'
import Triangle from '@/shared/ui/lib/svg/Triangle'
import { useValidateAddressInput } from '../lib/useValidateAddressInput'
import UserInput from '../lib/ui/UserInput'
import Dot from '../lib/ui/Dot'
import { useAppStore } from '@/entities/lib/store'

const { CLIENT_FORM: { FIELD_ADDRESS: { LABEL, EXTRA_INFO, ON_INVALID, SUMMARY, TAKE_AWAY } } } = i18n.LANG.ESP.UI
const extraInfoText = EXTRA_INFO.toUpperCase()
const onInvalidText = ON_INVALID.toUpperCase()
const summaryText = SUMMARY.toUpperCase()

export default memo(function AddressInput ({ isDetailsOpen, setDetailsOpenState }) {
  const detailsRef = useRef(null)
  const { selectedDeliveryMethod } = useAppStore()
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

  const isTakeAwaySelected = selectedDeliveryMethod?.label && /take-?\s?away/i.test(selectedDeliveryMethod.label)
  const labelText = isTakeAwaySelected ? TAKE_AWAY.toUpperCase() : LABEL.toUpperCase()

  if (isTakeAwaySelected) {
    const [title, ...sentences] = labelText.split('\n')
    return (
      <div className={classes.address_input}>
        <div>
          <h4 className={classes.takeAway_title}>{selectedDeliveryMethod.label.toUpperCase()}</h4>
          <p className={classes.takeAway_text}>
            <span className={classes.takeAway_tag}>
              {selectedDeliveryMethod?.day}
            </span>
            <span className={classes.takeAway_tag}>
              {selectedDeliveryMethod?.businessHours}
            </span>
          </p>
          <p className={classes.takeAway_text}>{title}</p>
          {
          sentences.map(sentence => {
            return (
              <p
                key={sentence}
                className={classes.takeAway_text}
              >
                {sentence}
              </p>
            )
          })
        }
        </div>
      </div>
    )
  }

  return (
    <div className={classes.address_input}>
      <label htmlFor='clientAddressID'>
        <p className={classes.input_label}> <Dot />{labelText}</p>
      </label>
      <UserInput
        isInvalid={invalidInput}
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
            {onInvalidText}
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
                      fill: 'black',
                      transform: `${isDetailsOpen ? 'rotate(180deg)' : 'rotate(90deg)'}`,
                      transition: 'all 150ms ease-out'
                    }}
                  />
                </span>
                {extraInfoText}
              </summary>
              <label htmlFor='textArea'>
                <p>{summaryText}</p>
              </label>
              <textarea
                onKeyDown={handleKeyPress}
                maxLength={120}
                placeholder='< 120 caract.'
                className={classes.textarea}
                id='textArea'
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
