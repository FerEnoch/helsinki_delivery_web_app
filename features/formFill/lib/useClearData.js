import { useAppStore } from '@/entities/lib/store'

export function useClearData () {
  const {
    clearClientData,
    clearCart,
    clearPaymentSlice,
    deleteReceiptFile,
    setDeliveryMethod,
    setFormSuccessfulSubmitOperation,
    togglePurchaseSummary,
    showPurchaseSummary
  } = useAppStore()

  const handleClearData = () => {
    setFormSuccessfulSubmitOperation(false)
    clearClientData()
    clearCart()
    clearPaymentSlice()
    deleteReceiptFile()
    setDeliveryMethod(null)
    if (showPurchaseSummary) togglePurchaseSummary()
  }

  return { handleClearData }
}
