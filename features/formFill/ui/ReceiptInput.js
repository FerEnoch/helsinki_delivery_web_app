import classes from './ReceiptInput.module.css'
import { memo, useEffect, useState } from 'react'
import { useHandleFileInput } from '../lib/useHandleFileInput'
import { unicaOne } from '@/shared/config/fonts'
import { useAppStore } from '@/entities/lib/store'
import Check from '@/shared/ui/lib/svg/Check'

const uploadAction = 'Sube tu comprobante'

export default memo(function ReceiptInput () {
  const [uploadingStart, setUploadingStart] = useState(false)
  const [uploadingEnd, setUploadingEnd] = useState(false)
  const { receiptFile } = useAppStore()
  const {
    receiptFileRef,
    isInputValid,
    handleInvalidInput,
    handleChangeFileInput,
    receiptNeededUIMessage,
    receiptInputUILabel
  } = useHandleFileInput()

  const handleStartUploading = () => setUploadingStart(true)

  useEffect(() => {
    if (receiptFile && isInputValid) setUploadingEnd(true)
  }, [receiptFile, isInputValid])

  return (
    <section className={classes.file_upload_section}>
      <div className={classes.receipt_input_wrapper}>
        <h3 className={`${classes.title} ${unicaOne.className}`}>
          {receiptInputUILabel}
        </h3>
        <label htmlFor='fileInputID' className={classes.input_label}>
          <p className={`
              ${classes.upload_action}
              ${uploadingStart && classes.uploading_start}
              ${uploadingEnd && classes.uploading_end}
           `}
          >
            {uploadAction}
            {uploadingEnd && <Check className={classes.check} />}
          </p>
        </label>
        {
          uploadingEnd && (
            <p>{receiptFile.name}</p>
          )
        }
        <input
          className={classes.file_input}
          onInvalid={handleInvalidInput}
          onChange={handleChangeFileInput}
          onInput={handleStartUploading}
          ref={receiptFileRef}
          required
          id='fileInputID'
          type='file'
          accept='image/*,.pdf'
          style={{ position: 'absolute', visibility: 'hidden' }}
        />
        {
     !isInputValid && (
       <p className={classes.invalid_input_message}>
         {receiptNeededUIMessage}
       </p>
     )
      }
      </div>
    </section>
  )
}
)
