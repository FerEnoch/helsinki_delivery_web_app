import { useEffect, useRef } from 'react'
import classes from './WarningDialog.module.css'

export default function WarningDialog ({ openModal, closeDialog, blockedApp, children }) {
  const offertDialogRef = useRef(null)

  useEffect(() => {
    if (openModal) {
      offertDialogRef.current?.showModal()
    } else {
      offertDialogRef.current?.close()
    }
  }, [openModal])

  useEffect(() => {
    if (blockedApp) offertDialogRef.current?.showModal()
  }, [blockedApp])

  return (
    <dialog
      className={classes.warning_dialog_container}
      ref={offertDialogRef}
      onClose={closeDialog}
    >
      {children}
    </dialog>
  )
}
