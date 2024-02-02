import { useAppStore } from '@/entities/lib/store'
import FormSuccessfulState from './FormSuccessfulState'
import SuccessHero from './SuccessHero'
import SuccessOperationMessage from './SuccessOperationMessage'
import { useRouter } from 'next/router'

export default function SuccessfulForm ({ closeDialog }) {
  const {
    clearClientData,
    clearCart,
    clearPaymentSlice,
    deleteReceiptFile,
    setFormSuccessfulSubmitOperation
  } = useAppStore()
  const router = useRouter()

  const handleBackHomeOperation = (target) => {
    setFormSuccessfulSubmitOperation(false)
    clearClientData()
    clearCart()
    clearPaymentSlice()
    deleteReceiptFile()
    closeDialog()
    router.push(target)
  }

  return (
    <FormSuccessfulState>
      <SuccessHero />
      <SuccessOperationMessage handleBackHomeOperation={handleBackHomeOperation} />
    </FormSuccessfulState>
  )
}
