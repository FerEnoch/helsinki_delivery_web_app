import { getInitialAppProducts } from '@/processes/services/model/server/getInitialAppProducts'
import { extract } from '@/processes/services/lib/extract'
import { i18n } from '@/shared/model/i18n'

const { CART: cartTexts } = i18n.LANG.ESP.UI

export async function getAggregates () {
  const initialProducts = await getInitialAppProducts()

  const { sortedProducts: allCigarProducts } = initialProducts.length > 0 &&
  cartTexts.ADDS_LABELS.length > 0 &&
  extract(
    [...initialProducts],
    { criteria: 'category', value: cartTexts.ADDS_LABELS[1].categoryOffering },
    { whereField: 'type', isEqual: cartTexts.ADDS_LABELS[1].label }
  )

  const cigarProducts = allCigarProducts?.filter(product => product.stock)
  const iceProducts = initialProducts?.filter(product => product.name.match(cartTexts.ADDS_LABELS[0]?.regExp))?.filter(product => product.stock)

  return [[...cigarProducts], [...iceProducts]]
}
