import { i18n } from '@/shared/model/i18n'

export function getMenuTitles () {
  const labels = []
  const menuTexts = i18n.LANG.ESP.UI.MENU
  /* eslint-disable-next-line */
  for (const [_, {label}] of Object.entries(menuTexts)) {
    labels.push(label)
  }
  return labels
}
