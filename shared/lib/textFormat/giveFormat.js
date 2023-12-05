import { i18n } from '@/shared/model/i18n'
import { textFormat } from './config'
import { charFormat } from './charFormat'

export const formatTradeMark = () => {
  const allUpperCase = i18n.TRADE_MARK.toUpperCase()
  return charFormat(allUpperCase, 'i', textFormat.LOW_CASE)
}

export const formatContactLink = () => {
  const { CONTACT: { label: contactInfo } } = i18n.LANG.ESP.UI.MENU
  return contactInfo.toUpperCase()
}

export const formatAbout = () => {
  const { ABOUT: { label: presentationInfo } } = i18n.LANG.ESP.UI.MENU
  const allUpperCase = presentationInfo.toUpperCase()
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

export const formatUpperCase = (incommingData) => {
  const string = String(incommingData)
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
  return formattedString || allUpperCase
}
