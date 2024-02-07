'use client'
import classes from './FormDialog.module.css'
import { forwardRef, useEffect, useMemo, useState } from 'react'
import { useFormModal } from '@/features/formFill/lib/useFormModal'
import { useAppStore } from '@/entities/lib/store'
import FormLoadingState from './FormLoadingState'
import DialogContainer from './DialogContainer'
import PurchaseSummary from '@/widgets/purchaseSummary/PurchaseSummary'
import DataForm from './DataForm'
import SuccessfulForm from './SuccessfulForm'

export default forwardRef(function FormDialog (props, ref) {
  const {
    formLoadingState,
    formSuccessfulSubmitOperation,
    showPurchaseSummary,
    togglePurchaseSummary
  } = useAppStore()
  const { closeFormDialog } = useFormModal(ref)
  const [showDataForm, setShowDataForm] = useState(false)

  useEffect(() => {
    const isPayMethodPage = window.location.href?.includes('pay-method')
    if (isPayMethodPage) setShowDataForm(true)
  }, [])

  const clientFormStates = useMemo(() => {
    if (formSuccessfulSubmitOperation && !formLoadingState) return <SuccessfulForm closeDialog={closeFormDialog} />
    if (formLoadingState && !formSuccessfulSubmitOperation) return <FormLoadingState />
    if (!formLoadingState && !formSuccessfulSubmitOperation) return <DataForm closeDialog={closeFormDialog} />
  }, [formLoadingState, formSuccessfulSubmitOperation, closeFormDialog])

  const formCloseHandler = () => {
    closeFormDialog()
    if (!showPurchaseSummary) togglePurchaseSummary()
  }

  return (
    <dialog
      ref={ref}
      className={classes.form_dialog_container}
      onClose={formCloseHandler}
    >
      <DialogContainer>
        {
          showPurchaseSummary && !showDataForm
            ? <PurchaseSummary closeFormDialog={closeFormDialog} />
            : clientFormStates
        }
      </DialogContainer>
    </dialog>
  )
})
