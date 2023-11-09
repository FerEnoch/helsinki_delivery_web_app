import { useAppStore } from '@/entities/lib/store'
import { useEffect, useState } from 'react'
import { useFormSubscription } from './useFormSubscription'

export function useFormData (fileRef) {
  const { client } = useAppStore()
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)
  const [showReceiptInput, setShowReceiptInput] = useState(undefined)
  const { isLoading, successfullOperation, isReceiptRequired, submitHandler } = useFormSubscription(fileRef)

  useEffect(() => {
    setShowReceiptInput(isReceiptRequired && !isLoading && !successfullOperation)
  }, [isLoading, successfullOperation, isReceiptRequired])

  useEffect(() => {
    const isButtonDisabled = !client?.name || !client?.address || !client?.phone
    setSubmitButtonDisabled(isButtonDisabled)
  }, [client])

  return {
    isLoading,
    submitHandler,
    successfullOperation,
    submitButtonDisabled,
    showReceiptInput
  }
}
