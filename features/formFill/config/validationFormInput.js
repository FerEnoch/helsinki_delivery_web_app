export const SPECIAL_CHAR = /<[^>]+>|[\\&|/#!<>+{}[\]/¿?$@%~*()]/g
export const LETTERS_CHAR = /[a-zA-Z-.,]/g

export const HTML_REGEXP = /<\/?[a-z]*[\s\S]*\/?>/ig
export const SCRIPT_REGEXP = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/ig
