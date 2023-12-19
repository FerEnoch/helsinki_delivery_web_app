import { useState } from 'react'

let firstTime = true

export function useWarningModal () {
  const [openModalDialog, setOpenModalDialog] = useState(false)

  const closeDialog = () => {
    setOpenModalDialog(false)
    firstTime = false
  }

  const openDialog = () => {
    if (!firstTime) return
    setOpenModalDialog(true)
  }

  return {
    openModalDialog,
    closeDialog,
    openDialog
  }
}
