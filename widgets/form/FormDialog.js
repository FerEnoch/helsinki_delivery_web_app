'use client'
import { i18n } from '@/shared/model/i18n'
import ClientDataForm from './ClientDataForm'
import classes from './FormDialog.module.css'

import { memo, useCallback, useEffect, useRef, useState } from 'react'

const { CART: cartTexts } = i18n.LANG.ESP.UI

export default memo(function FormDialog ({ modalOpenState, closeDialog }) {
  const offertDialogRef = useRef(null)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [showButton, setShowButton] = useState(true)

  const disableButton = useCallback((isDisabled) => {
    setButtonDisabled(isDisabled)
  }, [])

  const showContinueShoppingButton = useCallback((successState) => {
    setShowButton(!successState)
  }, [])

  useEffect(() => {
    if (modalOpenState) {
      offertDialogRef.current?.showModal()
    } else {
      offertDialogRef.current?.close()
    }
  }, [modalOpenState])

  return (
    <dialog
      className={classes.form_dialog_container}
      ref={offertDialogRef}
      onClose={closeDialog}
    >
      <main className={classes.dialog_main}>
        <ClientDataForm
          closeDialog={closeDialog}
          disableButton={disableButton}
          showContinueShoppingButton={showContinueShoppingButton}
        />
        {
        showButton && (
          <div className={classes.button_container}>
            <button
              className={classes.back_button}
              onClick={closeDialog}
              disabled={buttonDisabled}
            >
              <p>
                {cartTexts.CONTINUE_SHOPPING}
              </p>
            </button>
          </div>
        )
        }
      </main>
    </dialog>
  )
})
