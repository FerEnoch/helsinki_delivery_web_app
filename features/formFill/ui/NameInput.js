import { i18n } from '@/shared/model/i18n'
import classes from './NameInput.module.css'
import inputClasses from '@/widgets/form/ClientDataForm.module.css'
import { useValidateNameInput } from '../lib/useValidateNameInput'
import { useState } from 'react'

const { CLIENT_FORM: { FIELD_NAME: { LABEL, ON_INVALID } } } = i18n.LANG.ESP.UI

export default function NameInput () {
  const [name, setName] = useState('')
  const [sanitizedName, invalidInput] = useValidateNameInput(name)

  return (
    <div className={`
    ${inputClasses.client_input} 
    ${classes.name_input} 
    `}
    >
      <label htmlFor='clientNameID'>
        <p>{LABEL}</p>
      </label>
      <input
        required
        id='clientNameID'
        type='text'
        value={sanitizedName || ''}
        onChange={(e) => setName(e.target.value)}
        onBlur={(e) => setName(e.target.value)}
      />
      {
        invalidInput && (
          <p className={classes.invalid_input_message}>
            {ON_INVALID}
          </p>
        )
      }
    </div>
  )
}
