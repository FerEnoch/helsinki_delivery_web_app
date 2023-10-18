import { i18n } from '@/shared/model/i18n'
import classes from './NameInput.module.css'
import inputClasses from '@/widgets/form/ClientDataForm.module.css'
import { useEffect, useState } from 'react'
import { useAppStore } from '@/entities/lib/store'

const { CLIENT_FORM } = i18n.LANG.ESP.UI

export default function NameInput () {
  const [name, setName] = useState('')
  const { setClientName } = useAppStore()

  useEffect(() => {
    setClientName(name)
  }, [name, setClientName])

  return (
    <div className={`${inputClasses.client_input} ${classes.name_input}`}>
      <label htmlFor='clientNameID'>
        <p>{CLIENT_FORM.FIELD_NAME}</p>
      </label>
      <input
        required
        id='clientNameID'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  )
}
