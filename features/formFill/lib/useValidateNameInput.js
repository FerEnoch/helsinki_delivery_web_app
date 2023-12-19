import { i18n } from '@/shared/model/i18n'
import { sanitizeInput } from './sanitizeInput'
import { useEffect, useState } from 'react'
import { useAppStore } from '@/entities/lib/store'

const { CLIENT_FORM: { FIELD_NAME: { LABEL, ON_INVALID } } } = i18n.LANG.ESP.UI

export function useValidateNameInput () {
  const [name, setName] = useState('')
  const [invalidInput, setInvalidInput] = useState(false)
  const { setClientName, client } = useAppStore()

  const hangleNameChange = (e) => setName(e.target.value)

  useEffect(() => {
    const [sanitizedNameInput, [specialCharInputMatch]] = sanitizeInput(name)

    if (!name || !specialCharInputMatch) setInvalidInput(false)

    if (specialCharInputMatch) setInvalidInput(true)
    else setClientName(sanitizedNameInput)
  }, [name, setClientName])

  return {
    hangleNameChange,
    sanitizedClientName: client?.name,
    invalidInput,
    labelText: LABEL.toUpperCase(),
    onInvalidText: ON_INVALID.toUpperCase()
  }
}
