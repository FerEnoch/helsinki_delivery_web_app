import { getInitialAppProducts } from '@/processes/services/model/server/getInitialAppProducts'
import { extract } from '@/processes/services/lib/extract'
import { i18n } from '@/shared/model/i18n'

const [
  { regExp: hieloRegexp },
  { label: cigarrillos, categoryOffering: catTabaqueria }
] = i18n.LANG.ESP.UI.CART.ADDS_LABELS

export async function getAggregates () {
  const initialProducts = await getInitialAppProducts()

  const { sortedProducts: allCigarProducts } = initialProducts.length > 0 && extract(
    initialProducts,
    { criteria: 'category', value: catTabaqueria },
    { whereField: 'type', isEqual: cigarrillos }
  )
  const cigarProducts = allCigarProducts?.filter(product => product.stock)

  const iceProducts = initialProducts?.filter(product => product.name.match(hieloRegexp))?.filter(product => product.stock)

  return cigarProducts && iceProducts ? [[...cigarProducts], [...iceProducts]] : []
}
