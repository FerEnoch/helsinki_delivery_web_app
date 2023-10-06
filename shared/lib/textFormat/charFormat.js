import { textFormat } from './config'

export function charFormat (string, char, variable) {
  let formattedString = 'You have to provide a character string or index number to format'
  const isToUpperCase = variable === textFormat.UP_CASE

  const format = (str) => {
    if (isToUpperCase) {
      return str.toUpperCase()
    } else {
      return str.toLowerCase()
    }
  }

  if (char && typeof char === 'number') {
    const letterArr = string.split('')
    formattedString = letterArr
      .map((letter, index, arr) => {
        if (index === char) return format(arr[index])
        else return letter
      })
      .join('')
  }

  if (char && typeof char === 'string') {
    const selectedChar = isToUpperCase
      ? char.toLowerCase()
      : char.toUpperCase()
    formattedString = string.replaceAll(selectedChar, format(char))
  }

  if (char && char === textFormat.CHAR_SELECT_ALL) {
    formattedString = isToUpperCase
      ? string.toUpperCase()
      : string.toLowerCase()
  }
  return formattedString
}
