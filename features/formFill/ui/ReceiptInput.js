import inputClasses from '@/widgets/form/ClientDataForm.module.css'
import classes from './ReceiptInput.module.css'

import { i18n } from '@/shared/model/i18n'
import { forwardRef } from 'react'
import { useShowReceiptRequiredMessage } from '../lib/useShowReceiptRequiredMessage'

const { CLIENT_FORM } = i18n.LANG.ESP.UI

export default forwardRef(function ReceiptInput (props, ref) {
  const {
    showRecipeRequiredMessage,
    hideRecipeRequiredMessage,
    isRecipeQuiredMessageVissible
  } = useShowReceiptRequiredMessage()

  return (
    <section className={classes.form_file_upload}>
      <div className={`${inputClasses.client_input} ${classes.receipt_input}`}>
        <label htmlFor='fileInputID'>
          <p>{CLIENT_FORM.FIELD_RECEIPT.LABEL}</p>
        </label>
        <input
          onInvalid={showRecipeRequiredMessage}
          onChange={hideRecipeRequiredMessage}
          ref={ref}
          required
          id='fileInputID'
          type='file'
          accept='image/*'
        />
        {
     isRecipeQuiredMessageVissible && (
       <p className={classes.invalid_input_message}>
         {CLIENT_FORM.FIELD_RECEIPT.ON_INVALID}
       </p>
     )
    }
      </div>
    </section>
  )
}
)
