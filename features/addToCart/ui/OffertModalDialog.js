import { useEffect, useRef } from 'react'
import classes from './OffertModalDialog.module.css'
import { i18n } from '@/shared/model/i18n'

const { CART: { CONTINUE_SHOPPING } } = i18n.LANG.ESP.UI

export default function OffertModalDialog ({ openModal, closeDialog, children }) {
  const offertDialogRef = useRef(null)

  const backButtonText = CONTINUE_SHOPPING.toUpperCase()

  useEffect(() => {
    if (openModal) {
      offertDialogRef.current?.showModal()
    } else {
      offertDialogRef.current?.close()
    }
  }, [openModal])

  return (
    <dialog
      className={classes.offert_dialog_container}
      ref={offertDialogRef}
      onClose={closeDialog}
    >
      <div className={classes.dialog_content}>
        <div className={classes.article_button_wrapper}>
          {children}
          <button
            className={classes.continue_buying_button}
            onClick={closeDialog}
          >
            <p>{backButtonText}</p>
          </button>
        </div>
      </div>
    </dialog>
  )
}
