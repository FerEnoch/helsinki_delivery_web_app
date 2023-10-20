import { LETTERS_CHAR, SPECIAL_CHAR } from '../config/validationFormInput'

export function validateInput (processInput, flag) {
  let sanitizedInput = processInput
  let foundInvalidCharacters

  const specialCharInputMatch = processInput?.match(SPECIAL_CHAR) || []
  foundInvalidCharacters = specialCharInputMatch

  specialCharInputMatch?.forEach(specialChar => {
    sanitizedInput = processInput?.replace(specialChar, '')
  })

  if (flag === 'NUMBER') {
    const lettersCharInputMatch = processInput?.match(LETTERS_CHAR) || []
    foundInvalidCharacters = [...specialCharInputMatch, ...lettersCharInputMatch]
    lettersCharInputMatch?.forEach(specialChar => {
      sanitizedInput = processInput?.replace(specialChar, '')
    })
  }

  return [sanitizedInput, foundInvalidCharacters]
}
