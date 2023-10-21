import { FORM_FIELDS } from '../config/formFieldsOrder'
import { HTML_REGEXP, SCRIPT_REGEXP } from '../config/validationFormInput'
import { validateInput } from './validateInput'

export function sanitizeOrderDataField ({ field, value }) {
  if (field === FORM_FIELDS.PAYMENT_RECEIPT.label) return value

  if (value.match(HTML_REGEXP) || value.match(SCRIPT_REGEXP)) {
    console.log(`SCRIPT DETECTED IN ${field} - NEUTRALIZING`)
    return validateInput(value, 'NO_SCRIPT')[0]
  }

  switch (field) {
    case FORM_FIELDS.TOTAL:
    case FORM_FIELDS.CLIENT_PHONE:
      return validateInput(value, 'NUMBER')[0]
    case FORM_FIELDS.CLIENT_NAME:
    case FORM_FIELDS.CLIENT_ADDRESS:
    case FORM_FIELDS.CLIENT_COMMENTS:
    case FORM_FIELDS.ORDER_ID:
      return validateInput(value)[0]
  }

  return value
}
