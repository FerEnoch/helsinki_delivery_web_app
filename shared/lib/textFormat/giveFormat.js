import { i18n } from '@/shared/model/i18n'
import { textFormat } from './config'
import { charFormat } from './charFormat'

export const formatTradeMark = () => {
  const allUpperCase = i18n.TRADE_MARK.toUpperCase()
  return charFormat(allUpperCase, 'i', textFormat.LOW_CASE)
}

export const formatContactLink = () => {
  return i18n.LANG.ESP.UI.CONTACT.toUpperCase()
}

export const formatAbout = () => {
  const allUpperCase = i18n.LANG.ESP.UI.PRESENTATION.toUpperCase()
  const formatCharI = charFormat(allUpperCase, 'i', textFormat.LOW_CASE)
  return charFormat(formatCharI, 'q', textFormat.LOW_CASE)
}

export const formatDeveloper = () => {
  const byWords = i18n.DEVELOPER.split(' ')
  return [
    byWords[0].toLowerCase(),
    byWords[1].toLowerCase(),
    byWords[2].toUpperCase()
  ].join(' ')
}

export const formatUpperCase = (string) => {
  const toLowerCaseChar = ['Q', 'U']
  let formattedString
  const allUpperCase = string.toUpperCase()
  let formattingString
  for (const char of toLowerCaseChar) {
    if (allUpperCase.includes(char)) {
      formattedString = charFormat(formattingString || allUpperCase, char, textFormat.LOW_CASE)
      formattingString = formattedString
    }
  }
  return formattedString
}
