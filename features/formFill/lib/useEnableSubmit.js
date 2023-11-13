import { useAppStore } from '@/entities/lib/store'
import { useEffect, useState } from 'react'
import { validatePhoneNumberLength } from './validatePhoneNumberLength'

export function useEnableSubmit () {
  const { client } = useAppStore()
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

  useEffect(() => {
    const isInformationCompleted = client?.name && client?.address && client?.phone
    const isPhoneNumberLongEnough = validatePhoneNumberLength(client?.phone)

    const isButtonDisabled = !isInformationCompleted || !isPhoneNumberLongEnough

    setSubmitButtonDisabled(isButtonDisabled)
  }, [client])

  return {
    submitButtonDisabled
  }
}
