import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import { i18n } from '@/shared/model/i18n'
import { formatAlcohol } from './formatAlcohol'

const { DETAIL_CARD_PRODUCT: { BODY: { generic_description: genericDescription } } } = i18n.LANG.ESP.UI
const destilleryUIText = 'Destilería: '
const alcoholUIText = 'Alcohol: '

export function useProductData (product) {
  const {
    name,
    category,
    image,
    description,
    destillery,
    alcohol = 0,
    imageID,
    isCombo
  } = product

  const formattedAlcohol = `${formatAlcohol(alcohol)}%`

  return {
    prodInfo: {
      name: `${formatUpperCase(name) || name.toUpperCase()}`,
      category,
      image,
      imageID
    },
    prodDetailInfo: {
      prodDescription: { description, genericDescription },
      prodDestillery: { destillery, destilleryUIText },
      prodAlcohol: { alcoholUIText, formattedAlcohol },
      comboProducts: isCombo ? product.products : []
    }
  }
}
