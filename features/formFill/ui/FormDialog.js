'use client'
import ClientDataForm from './ClientDataForm'
import classes from './FormDialog.module.css'

import { Suspense, useEffect, useRef } from 'react'

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
              VOLVER
            </p>
          </button>
        </div>
      </main>
    </dialog>
  )
}
