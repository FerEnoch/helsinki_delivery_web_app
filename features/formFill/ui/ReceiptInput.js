import inputClasses from '@/widgets/form/ClientDataForm.module.css'
import classes from './ReceiptInput.module.css'

import { i18n } from '@/shared/model/i18n'
import { forwardRef, memo } from 'react'
import { useShowReceiptRequiredMessage } from '../lib/useShowReceiptRequiredMessage'

const { CLIENT_FORM: { FIELD_RECEIPT: { LABEL, ON_INVALID } } } = i18n.LANG.ESP.UI
const receiptNeededUIMessage = ON_INVALID?.toUpperCase()
const receiptInputUILabel = LABEL?.toUpperCase()

export default memo(forwardRef(function ReceiptInput (props, ref) {
  const { isReceiptRequiredMessageVisible, handleInvalidInput, handleChangeFileInput } = useShowReceiptRequiredMessage()

  return (
    <section className={classes.form_file_upload}>
      <div className={`${inputClasses.client_input} ${classes.receipt_input}`}>
        <label htmlFor='fileInputID'>
          <p>{receiptInputUILabel}</p>
        </label>
        <input
          onInvalid={handleInvalidInput}
          onChange={handleChangeFileInput}
          ref={ref}
          required
          id='fileInputID'
          type='file'
          accept='image/*'
        />
        {
     isReceiptRequiredMessageVisible && (
       <p className={classes.invalid_input_message}>
         {receiptNeededUIMessage}
       </p>
     )
    }
      </div>
    </section>
  )
}
))
