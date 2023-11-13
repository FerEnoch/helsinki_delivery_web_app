import { i18n } from '@/shared/model/i18n'

export function usePhoneInputTexts () {
  const {
    CLIENT_FORM: {
      FIELD_PHONE: {
        INITIAL_CHAR_NUM,
        INITIAL_PHONE_NUM,
        LABEL,
        ON_INVALID,
        ON_TOO_SHORT
      }
    }
  } = i18n.LANG.ESP.UI
  const labelText = LABEL.toUpperCase()
  const onInvalidText = ON_INVALID.toUpperCase()
  const onTooShortText = ON_TOO_SHORT.toUpperCase()

  return {
    labelText,
    onInvalidText,
    onTooShortText,
    INITIAL_CHAR_NUM,
    INITIAL_PHONE_NUM
  }
}
