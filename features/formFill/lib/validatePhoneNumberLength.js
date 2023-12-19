import { VALIDATION_RULES } from '../config/validationFormInput'

export function validatePhoneNumberLength (completeNumber) {
  const { PHONE_CHARACTER, PHONE_NUMBER } = VALIDATION_RULES
  const { minLength: charMinLength, maxLength: charrMaxLength } = PHONE_CHARACTER
  const { minLength: phoneMinLength, maxLength: phoneMaxLength } = PHONE_NUMBER

  const completeNumberLength = completeNumber?.length

  const numberMinLength = charMinLength + phoneMinLength
  const numberMaxLength = charrMaxLength + phoneMaxLength

  return completeNumberLength >= numberMinLength && completeNumberLength <= numberMaxLength
}
