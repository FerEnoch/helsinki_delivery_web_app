import { useAppStore } from '@/entities/lib/store'
import { useEffect, useState } from 'react'
import { sanitizeInput } from './sanitizeInput'

export function useValidateAddressInput ({ address, addressComments }) {
  const [invalidInput, setInvalidInput] = useState(false)
  const { setClientAddress, client } = useAppStore()

  useEffect(() => {
    const [sanitizedAddressInput, [specialCharInputMatchAddress]] = sanitizeInput(address)
    const [sanitizedCommentsInput, [specialCharInputMatchComments]] = sanitizeInput(addressComments)
    const emptyInput = !address || !addressComments
    const isInputValid = emptyInput || !specialCharInputMatchAddress || !specialCharInputMatchComments
    if (isInputValid) setInvalidInput(false)

    if (specialCharInputMatchAddress) setInvalidInput(true)
    else setClientAddress({ address: sanitizedAddressInput, addressComments: sanitizedCommentsInput })
  }, [address, addressComments, setClientAddress])

  return [
    { sanitizedAddress: client?.address, sanitizedComments: client?.addressComments },
    invalidInput
  ]
}
