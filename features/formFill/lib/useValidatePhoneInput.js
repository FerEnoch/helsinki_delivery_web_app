import { useAppStore } from '@/entities/lib/store'
import { useEffect, useState } from 'react'
import { validateInput } from './validateInput'

export function useValidatePhoneInput ({ phoneCaracteristic, phoneNumber }) {
  const [invalidInput, setInvalidInput] = useState(false)
  const [sanitizedPhoneCaracteristic, setSanitizedPhoneCaracteristic] = useState('')
  const [sanitizedPhoneNumber, setSanitizedPhoneNumber] = useState('')
  const { setClientPhone } = useAppStore()

  useEffect(() => {
    const [processedPhoneChar, [specialCharInputMatchPhonaChar]] = validateInput(phoneCaracteristic, 'NUMBER')
    const [processedPhoneNum, [specialCharInputMatchPhoneNum]] = validateInput(phoneNumber, 'NUMBER')

    const emptyInput = !phoneCaracteristic || !phoneNumber
    const isInputValid = emptyInput || !specialCharInputMatchPhonaChar || !specialCharInputMatchPhoneNum
    if (isInputValid) setInvalidInput(false)
    if (specialCharInputMatchPhonaChar || specialCharInputMatchPhoneNum) setInvalidInput(true)

    setSanitizedPhoneCaracteristic(processedPhoneChar)
    setSanitizedPhoneNumber(processedPhoneNum)
  }, [phoneCaracteristic, phoneNumber])

  useEffect(() => {
    const isPhoneNumberComplete = sanitizedPhoneCaracteristic && sanitizedPhoneNumber
    const completePhoneInput = isPhoneNumberComplete && `${sanitizedPhoneCaracteristic.trim()}${sanitizedPhoneNumber.trim()}`
    setClientPhone(completePhoneInput)
  }, [sanitizedPhoneCaracteristic, sanitizedPhoneNumber, setClientPhone])

  return [
    { sanitizedPhoneCaracteristic, sanitizedPhoneNumber },
    invalidInput
  ]
}
