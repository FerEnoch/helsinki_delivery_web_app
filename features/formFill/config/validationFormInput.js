export const VALIDATION_RULES = {
  HTML_REGEXP: /<\/?[a-z]*[\s\S]*\/?>/ig,
  SCRIPT_REGEXP: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/ig,
  PHONE_CHARACTER: { minLength: 3, maxLength: 5 },
  PHONE_NUMBER: { minLength: 4, maxLength: 9 },
  SPECIAL_CHAR: /<[^>]+>|[\\&|/#!º<>+{}[\]/¿?$@%~*()]/g,
  LETTERS_CHAR: /[a-zA-Z-.,]/g
}
