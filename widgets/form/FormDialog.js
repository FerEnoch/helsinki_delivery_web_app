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
import { ORDER_OPERATION_TIME } from '@/features/formFill/config/orderOperationTime'

const { SUCCESS_OPERATION_MAX_TIME_MS } = ORDER_OPERATION_TIME

export default forwardRef(function FormDialog (props, ref) {
  const { formLoadingState, formSuccessfulSubmitOperation } = useAppStore()
  const { closeFormDialog } = useFormModal(ref)

  const closeDialog = useCallback(() => closeFormDialog(), [closeFormDialog])

  const clientFormStates = useMemo(() => {
    if (formSuccessfulSubmitOperation && !formLoadingState) {
      setTimeout(() => closeDialog(), SUCCESS_OPERATION_MAX_TIME_MS)
      return <FormSuccessfulState />
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
  }, [formLoadingState, formSuccessfulSubmitOperation, closeDialog])

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
