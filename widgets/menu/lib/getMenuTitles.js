import { i18n } from '@/shared/model/i18n'

export function getMenuTitles () {
  const uiTexts = []
  const menuTexts = i18n.LANG.ESP.UI.MENU
  /* eslint-disable-next-line */
  for (const [label, text] of Object.entries(menuTexts)) {
    uiTexts.push(text)
  }
  return uiTexts
}
