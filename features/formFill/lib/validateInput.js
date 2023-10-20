export function validateInput (processInput) {
  // let isInvalid
  // const HTML_REGEXP = /<\/?[a-z][\s\S]*>/ig
  // isInvalid = HTML_REGEXP.test(processInput)

  // const SCRIPT_REGEXP = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/ig
  // isInvalid = SCRIPT_REGEXP.test(processInput)

  const SPECIAL_CHAR = /<[^>]+>|[\\|/#!<>/¿?$@%~*()]/g
  const specialCharInputMatch = processInput?.match(SPECIAL_CHAR) || []

  let sanitizedInput = processInput

  specialCharInputMatch?.forEach(specialChar => {
    sanitizedInput = processInput?.replace(specialChar, '')
  })

  return [sanitizedInput, specialCharInputMatch]
}
