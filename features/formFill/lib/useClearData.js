import { useAppStore } from '@/entities/lib/store'

export function useClearData () {
  const {
    clearClientData,
    clearCart,
    clearPaymentSlice,
    deleteReceiptFile,
    setDeliveryMethod,
    setFormSuccessfulSubmitOperation
  } = useAppStore()

  const handleClearData = () => {
    setFormSuccessfulSubmitOperation(false)
    clearClientData()
    clearCart()
    clearPaymentSlice()
    deleteReceiptFile()
    setDeliveryMethod(null)
  }

  return { handleClearData }
}
