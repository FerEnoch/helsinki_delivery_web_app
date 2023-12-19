import { VALIDATION_RULES } from '../config/validationFormInput'

const {
  HTML_REGEXP,
  LETTERS_CHAR,
  SCRIPT_REGEXP,
  SPECIAL_CHAR
} = VALIDATION_RULES

export function sanitizeInput (processInput, flag) {
  let sanitizedInput = processInput
  let foundInvalidCharacters
  if (flag === 'NO_SCRIPT') {
    const scriptRegex = [HTML_REGEXP, SCRIPT_REGEXP]
    scriptRegex.forEach(regex => {
      const scriptMatch = sanitizedInput?.match(regex) || []
      console.log(scriptMatch)
      scriptMatch?.forEach(foundScript => {
        const sanitizingString = sanitizedInput?.replaceAll(foundScript, '')
        sanitizedInput = sanitizingString
      })
    })
  }

  const specialCharInputMatch = processInput?.match(SPECIAL_CHAR) || []
  foundInvalidCharacters = specialCharInputMatch

  specialCharInputMatch?.forEach(specialChar => {
    const sanitizingString = sanitizedInput?.replaceAll(specialChar, '')
    sanitizedInput = sanitizingString
  })

  if (flag === 'NUMBER') {
    const lettersCharInputMatch = processInput?.match(LETTERS_CHAR) || []
    foundInvalidCharacters = [...specialCharInputMatch, ...lettersCharInputMatch]
    lettersCharInputMatch?.forEach(specialChar => {
      const sanitizingString = sanitizedInput?.replaceAll(specialChar, '')
      sanitizedInput = sanitizingString
    })
  }

  return [sanitizedInput, foundInvalidCharacters]
}
