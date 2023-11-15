'use client'
import classes from './FormDialog.module.css'
import { forwardRef, useCallback, useMemo } from 'react'
import { useFormModal } from '@/features/formFill/lib/useFormModal'
import ClientForm from './ClientForm'
import { useAppStore } from '@/entities/lib/store'
import FormLoadingState from './FormLoadingState'
import FormSuccessfulState from './FormSuccessfulState'
import ClientDataFields from './ClientDataFields'
import FormFooter from '@/features/formFill/ui/FormFooter'
import FormHeader from './FormHeader'
import DialogContainer from './DialogContainer'
import SuccessHero from './SuccessHero'
import SuccessOperationMessage from './SuccessOperationMessage'
import { useRouter } from 'next/navigation'

export default forwardRef(function FormDialog (props, ref) {
  const {
    formLoadingState,
    formSuccessfulSubmitOperation,
    clearClientData,
    clearCart,
    clearPaymentSlice,
    deleteReceiptFile,
    setFormSuccessfulSubmitOperation
  } = useAppStore()
  const router = useRouter()
  const { closeFormDialog } = useFormModal(ref)

  const closeDialog = useCallback(() => closeFormDialog(), [closeFormDialog])
  const handleBackHomeOperation = useCallback(() => {
    setFormSuccessfulSubmitOperation(false)
    clearClientData()
    clearCart()
    clearPaymentSlice()
    deleteReceiptFile()
    closeDialog()
    router.push('/')
  }, [
    closeDialog,
    router,
    clearClientData,
    clearCart,
    clearPaymentSlice,
    deleteReceiptFile,
    setFormSuccessfulSubmitOperation
  ])

  const clientFormStates = useMemo(() => {
    if (formSuccessfulSubmitOperation && !formLoadingState) {
      return (
        <FormSuccessfulState>
          <SuccessHero />
          <SuccessOperationMessage handleBackHomeOperation={handleBackHomeOperation} />
        </FormSuccessfulState>
      )
    }
    if (formLoadingState && !formSuccessfulSubmitOperation) return <FormLoadingState />
    if (!formLoadingState && !formSuccessfulSubmitOperation) {
      return (
        <ClientForm>
          <div className={classes.red_line} />
          <FormHeader />
          <ClientDataFields />
          <FormFooter closeFormDialog={closeDialog} />
        </ClientForm>
      )
    }
  }, [
    formLoadingState,
    formSuccessfulSubmitOperation,
    closeDialog,
    handleBackHomeOperation
  ])

  return (
    <dialog
      ref={ref}
      className={classes.form_dialog_container}
      onClose={closeFormDialog}
    >
      <DialogContainer>
        {clientFormStates}
      </DialogContainer>
    </dialog>
  )
})
