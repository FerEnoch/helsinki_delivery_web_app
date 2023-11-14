import { useRef, useState } from 'react'
import { i18n } from '@/shared/model/i18n'
import { useAppStore } from '@/entities/lib/store'
import { sanitizeFile } from './sanitizeFile'

const { CLIENT_FORM: { FIELD_RECEIPT: { LABEL, ON_INVALID } } } = i18n.LANG.ESP.UI
const receiptNeededUIMessage = ON_INVALID?.toUpperCase()
const receiptInputUILabel = `5 - ${LABEL?.toUpperCase()}`

export function useHandleFileInput () {
  const receiptFileRef = useRef(null)
  const { uploadReceiptFile } = useAppStore()
  const [isInputValid, setIsInputValid] = useState(true)
  const handleInvalidInput = () => setIsInputValid(true)

  const handleChangeFileInput = () => {
    const [file] = receiptFileRef.current?.files
    if (file) {
      const isFileValid = sanitizeFile(file)
      setIsInputValid(isFileValid)
      if (isFileValid) uploadReceiptFile(file)
    } else {
      setIsInputValid(false)
    }
  }

  return {
    receiptFileRef,
    isInputValid,
    handleInvalidInput,
    handleChangeFileInput,
    receiptNeededUIMessage,
    receiptInputUILabel
  }
}
