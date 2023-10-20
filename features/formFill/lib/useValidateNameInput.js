import { validateInput } from './validateInput'
import { useEffect, useState } from 'react'
import { useAppStore } from '@/entities/lib/store'

export function useValidateNameInput (name) {
  const [invalidInput, setInvalidInput] = useState(false)
  const { setClientName, client } = useAppStore()

  useEffect(() => {
    const [sanitizedNameInput, [specialCharInputMatch]] = validateInput(name)

    if (!name || !specialCharInputMatch) setInvalidInput(false)

    if (specialCharInputMatch) setInvalidInput(true)
    else setClientName(sanitizedNameInput)
  }, [name, setClientName])

  return [client?.name, invalidInput]
}
