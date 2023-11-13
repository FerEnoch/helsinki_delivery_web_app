'use client'
import classes from './FormDialog.module.css'

import { forwardRef, useCallback, useMemo } from 'react'
import { useFormModal } from '@/features/formFill/lib/useFormModal'
import ClientForm from './ClientForm'
import { useAppStore } from '@/entities/lib/store'
import FormLoadingState from './FormLoadingState'
import OrderSent from './OrderSent'
import ClientDataFields from './ClientDataFields'
import FormFooter from '@/features/formFill/ui/FormFooter'
import FormHeader from './FormHeader'
import DialogContainer from './DialogContainer'

export default forwardRef(function FormDialog (props, ref) {
  const { formLoadingState, formSuccessfullSubmitOperation } = useAppStore()
  const { closeFormDialog } = useFormModal(ref)

  const closeDialog = useCallback(() => closeFormDialog(), [closeFormDialog])

  const showLoadingState = useMemo(() => formLoadingState && !formSuccessfullSubmitOperation, [formLoadingState, formSuccessfullSubmitOperation])
  const showSuccessView = useMemo(() => formSuccessfullSubmitOperation && !formLoadingState, [formLoadingState, formSuccessfullSubmitOperation])

  return (
    <dialog
      ref={ref}
      className={classes.form_dialog_container}
      onClose={closeFormDialog}
    >
      <DialogContainer>
        {
      showLoadingState && <FormLoadingState />
        }
        {!showLoadingState && !showSuccessView && (
          <ClientForm>
            <div className={classes.red_line} />
            <FormHeader />
            <ClientDataFields />
            <FormFooter closeFormDialog={closeDialog} />
          </ClientForm>
        )}
        {
      showSuccessView && <OrderSent />
        }
      </DialogContainer>
    </dialog>
  )
})
