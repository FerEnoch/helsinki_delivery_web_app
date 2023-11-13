import { useAppStore } from '@/entities/lib/store'
import { useEffect, useMemo, useState } from 'react'
import { sanitizeInput } from './sanitizeInput'
import { validatePhoneNumberLength } from './validatePhoneNumberLength'

export function useValidatePhoneInput (isDetailsOpen) {
  const [phoneCharacteristic, setPhoneCharacteristic] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isNumberTooShort, setIsNumberTooShort] = useState(undefined)
  const [invalidInput, setInvalidInput] = useState(false)
  const [sanitizedPhoneCharacteristic, setSanitizedPhoneCharacteristic] = useState('')
  const [sanitizedPhoneNumber, setSanitizedPhoneNumber] = useState('')
  const { setClientPhone, client } = useAppStore()

  const handlePhoneCharacteristic = (e) => setPhoneCharacteristic(e.target.value)
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value)

  useEffect(() => {
    const [processedPhoneChar, [specialCharInputMatchPhonaChar]] = sanitizeInput(phoneCharacteristic, 'NUMBER')
    const [processedPhoneNum, [specialCharInputMatchPhoneNum]] = sanitizeInput(phoneNumber, 'NUMBER')

    const emptyInput = !phoneCharacteristic || !phoneNumber
    const isInputValid = emptyInput || !specialCharInputMatchPhonaChar || !specialCharInputMatchPhoneNum
    if (isInputValid) setInvalidInput(false)
    if (specialCharInputMatchPhonaChar || specialCharInputMatchPhoneNum) setInvalidInput(true)

    setSanitizedPhoneCharacteristic(processedPhoneChar)
    setSanitizedPhoneNumber(processedPhoneNum)
  }, [phoneCharacteristic, phoneNumber])

  useEffect(() => {
    if (!client?.phone || !client?.phone.length) {
      if (!phoneCharacteristic) return setIsNumberTooShort(false)
      else return
    }
    const isNumberLongEnough = validatePhoneNumberLength(client?.phone)

    if (isNumberLongEnough) setIsNumberTooShort(!isNumberLongEnough)

    const timerToShowUI = setTimeout(() => {
      setIsNumberTooShort(!isNumberLongEnough)
    }, 3000)
    return () => clearTimeout(timerToShowUI)
  }, [client, phoneCharacteristic])

  useEffect(() => {
    const isPhoneNumberComplete = sanitizedPhoneCharacteristic && sanitizedPhoneNumber
    const completePhoneInput = isPhoneNumberComplete && `${sanitizedPhoneCharacteristic.trim()}${sanitizedPhoneNumber.trim()}`
    setClientPhone(completePhoneInput)
  }, [sanitizedPhoneCharacteristic, sanitizedPhoneNumber, setClientPhone])

  const openDetailsPhoneInputStyle = useMemo(() => ({
    transition: `${isDetailsOpen ? 'all 250ms ease-in' : ''}`,
    paddingBlockStart: `${isDetailsOpen ? '2rem' : ''}`,
    zIndex: `${isDetailsOpen ? '-1' : ''}`
  }), [isDetailsOpen])

  return {
    sanitizedInput: { sanitizedPhoneCharacteristic, sanitizedPhoneNumber },
    invalidInput,
    handlePhoneCharacteristic,
    handlePhoneNumber,
    inputStyle: openDetailsPhoneInputStyle,
    isNumberTooShort
  }
}
