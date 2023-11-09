import { useCallback, useState } from 'react'

export function useShowReceiptRequiredMessage () {
  const [showMessageReceiptRequired, setShowMessageReceiptRequired] = useState(false)

  const handleInvalidInput = useCallback(() => setShowMessageReceiptRequired(true), [])

  const handleChangeFileInput = useCallback(() => setShowMessageReceiptRequired(false), [])

  return {
    handleInvalidInput,
    handleChangeFileInput,
    isReceiptRequiredMessageVisible: showMessageReceiptRequired
  }
}
