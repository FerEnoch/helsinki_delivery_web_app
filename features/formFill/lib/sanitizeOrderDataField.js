import { FORM_FIELDS } from '../config/formFieldsOrder'
import { VALIDATION_RULES } from '../config/validationFormInput'
import { sanitizeFile } from './sanitizeFile'
import { sanitizeInput } from './sanitizeInput'

const { HTML_REGEXP, SCRIPT_REGEXP } = VALIDATION_RULES

export function sanitizeOrderDataField ({ field, value }) {
  if (field === FORM_FIELDS.PAYMENT_RECEIPT.label) {
    const isValidFile = sanitizeFile(value)
    if (isValidFile) return value
    else throw new Error('RECEIPT FILE -> ** Potencially dangerous file - IT COULD NOT BE SANITIZED')
  }

  if (value.match(HTML_REGEXP) || value.match(SCRIPT_REGEXP)) {
    console.log(`SCRIPT DETECTED IN ${field} - NEUTRALIZING`)
    return sanitizeInput(value, 'NO_SCRIPT')[0]
  }

  switch (field) {
    case FORM_FIELDS.TOTAL:
    case FORM_FIELDS.CLIENT_PHONE:
      return sanitizeInput(value, 'NUMBER')[0]
    case FORM_FIELDS.CLIENT_NAME:
    case FORM_FIELDS.CLIENT_ADDRESS:
    case FORM_FIELDS.CLIENT_COMMENTS:
    case FORM_FIELDS.ORDER_ID:
      return sanitizeInput(value)[0]
  }

  return value
}
