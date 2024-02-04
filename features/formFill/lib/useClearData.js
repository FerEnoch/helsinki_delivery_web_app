import { useAppStore } from '@/entities/lib/store'

export function useClearData () {
  const {
    clearClientData,
    clearCart,
    clearPaymentSlice,
    deleteReceiptFile,
    setFormSuccessfulSubmitOperation
  } = useAppStore()

  const handleClearData = () => {
    setFormSuccessfulSubmitOperation(false)
    clearClientData()
    clearCart()
    clearPaymentSlice()
    deleteReceiptFile()
  }

  return { handleClearData }
}
