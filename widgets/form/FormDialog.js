'use client'
import { i18n } from '@/shared/model/i18n'
import ClientDataForm from './ClientDataForm'
import classes from './FormDialog.module.css'

import { useEffect, useRef } from 'react'

const { CART: cartTexts } = i18n.LANG.ESP.UI

export default function FormDialog ({ openModal, closeDialog }) {
  const offertDialogRef = useRef(null)

  useEffect(() => {
    if (openModal) {
      offertDialogRef.current?.showModal()
    } else {
      offertDialogRef.current?.close()
    }
  }, [openModal])

  return (
    <dialog
      className={classes.form_dialog_container}
      ref={offertDialogRef}
      onClose={closeDialog}
    >
      <main className={classes.dialog_main}>
        <ClientDataForm closeDialog={closeDialog} />
        <div className={classes.button_container}>
          <button
            className={classes.back_button}
            onClick={closeDialog}
          >
            <p>
              {cartTexts.CONTINUE_SHOPPING}
            </p>
          </button>
        </div>
      </main>
    </dialog>
  )
}
