import { useState } from 'react'

export function useShowReceiptRequiredMessage () {
  const [showMessageReceiptRequired, setShowMessageReceiptRequired] = useState(false)

  const showReceiptRequiredMessage = () => setShowMessageReceiptRequired(true)
  const hideReceiptRequiredMessage = () => setShowMessageReceiptRequired(false)

  return {
    showReceiptRequiredMessage,
    hideReceiptRequiredMessage,
    isReceiptQuiredMessageVissible: showMessageReceiptRequired
  }
}
