import { i18n } from '@/shared/model/i18n'
import MainErrorBoundary from '@/widgets/error/MainErrorBoundary'
import InfoPageWrapper from '@/widgets/info/InfoPageWrapper'
import { extract } from '@/processes/services/lib/extract'
import { getInitialAppProducts } from '@/processes/services/model/server/getInitialAppProducts'
// import ProductListSlideClient from '@/widgets/sliders/ui/ProductListSlideClient'
import TypesPage from '@/entities/product/ui/prodTypes/TypesPage'

export const dynamic = 'force-dynamic'
const notFoundErrorTexts = i18n.LANG.ESP.UI.ERROR.NOT_FOUND

export default async function TypePage ({ params }) {
  let { category, type } = params
  category = decodeURIComponent(category)
  type = decodeURIComponent(type)

  const initialProducts = await getInitialAppProducts()

  const { sortedProducts: specificProductList, sort2ndCriteria } = initialProducts?.length > 0 && extract(
    initialProducts,
    { criteria: 'category', value: category },
    { whereField: 'type', isEqual: type || '*' }
  )

  if (!specificProductList) {
    return (
      <InfoPageWrapper>
        <MainErrorBoundary type={notFoundErrorTexts} />
      </InfoPageWrapper>
    )
  }

  const [{ type: subtype }] = Object.values(sort2ndCriteria?.category)

  const combosSet = new Set()
  initialProducts.filter(({ isCombo }) => isCombo).forEach(({ category }) => combosSet.add(category))

  return (
    <TypesPage
      category={category}
      subtypes={[subtype] || null}
      isCombo={combosSet.has(category)}
    />
  )
}
