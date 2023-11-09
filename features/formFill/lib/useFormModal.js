import { useAppStore } from '@/entities/lib/store'
import { useCallback, useEffect, useState } from 'react'

export function useFormModal (nodeRef) {
  const { cart, paymentMethod } = useAppStore()
  const [isDisabledModalOpening, setIsDisableModalOpening] = useState(null)

  const closeFormDialog = useCallback(() => nodeRef.current?.close(), [nodeRef])

  const openFormDialog = useCallback(() => {
    if (!isDisabledModalOpening) nodeRef.current?.showModal()
  }, [isDisabledModalOpening, nodeRef])

  useEffect(() => {
    const disableOpenForm = !(cart.length > 0) || !paymentMethod?.label
    setIsDisableModalOpening(disableOpenForm)
  }, [cart, paymentMethod])

  return {
    isDisabledModalOpening,
    openFormDialog,
    closeFormDialog
  }
}
