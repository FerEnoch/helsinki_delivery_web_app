import inputClasses from '@/widgets/form/ClientDataForm.module.css'
import { useEffect, useState } from 'react'
import { i18n } from '@/shared/model/i18n'
import { useAppStore } from '@/entities/lib/store'

const { CLIENT_FORM } = i18n.LANG.ESP.UI

export default function PhoneInput ({ style }) {
  const [phoneInput, setPhoneInput] = useState('')
  const { setClientPhone } = useAppStore()

  useEffect(() => {
    setClientPhone(phoneInput)
  }, [phoneInput, setClientPhone])

  return (
    <div style={style} className={inputClasses.client_input}>
      <label htmlFor='clientPhone'>
        <p>{CLIENT_FORM.FIELD_PHONE}</p>
      </label>
      <input
        required
        name='clientPhone'
        id='clientPhoneID'
        type='number'
        value={phoneInput}
        onChange={(e) => setPhoneInput(e.target.value)}
      />
    </div>
  )
}
