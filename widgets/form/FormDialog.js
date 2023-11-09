'use client'
import { i18n } from '@/shared/model/i18n'
import ClientDataForm from './ClientDataForm'
import classes from './FormDialog.module.css'

import { forwardRef, useCallback, useState } from 'react'
import { useFormModal } from '@/features/formFill/lib/useFormModal'

const { CART: { FOOTER_BUTTONS: { BACK } } } = i18n.LANG.ESP.UI
const backButtonText = BACK.toUpperCase()

export default forwardRef(function FormDialog (props, ref) {
  const { closeFormDialog } = useFormModal(ref)
  const [showFooterButtons, setShowFooterButtons] = useState(true)

  const showContinueShoppingButton = useCallback((successState) => {
    setShowFooterButtons(!successState)
  }, [])

  return (
    <dialog
      ref={ref}
      className={classes.form_dialog_container}
      onClose={closeFormDialog}
    >
      <main className={classes.dialog_main}>
        <ClientDataForm
          showContinueShoppingButton={showContinueShoppingButton}
        />
        {
        showFooterButtons && (
          <div className={classes.button_container}>
            <button
              className={classes.back_button}
              onClick={closeFormDialog}
            >
              <p> {backButtonText} </p>
            </button>
          </div>)
        }
      </main>
    </dialog>
  )
})
