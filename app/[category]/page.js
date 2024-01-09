import { i18n } from '@/shared/model/i18n'
import MainErrorBoundary from '@/widgets/error/MainErrorBoundary'
import InfoPageWrapper from '@/widgets/info/InfoPageWrapper'
import CategoryHomePage from '@/entities/product/ui/prodCategories/CategoryHomePage'
import { extract } from '@/processes/services/lib/extract'
import { getInitialAppProducts } from '@/processes/services/model/server/getInitialAppProducts'

export const dynamic = 'force-dynamic'

const notFoundErrorTexts = i18n.LANG.ESP.UI.ERROR.NOT_FOUND

export default async function CategoryPage ({ params }) {
  let { category } = params
  category = decodeURIComponent(category)

  const initialProducts = await getInitialAppProducts()

  const { sortedProducts: specificProductList } = initialProducts?.length > 0 && extract(
    [...initialProducts],
    { criteria: 'category', value: category }
  )

  if (!specificProductList?.length) {
    return (
      <InfoPageWrapper>
        <MainErrorBoundary type={notFoundErrorTexts} />
      </InfoPageWrapper>
    )
  }

  return (
    <CategoryHomePage
      category={category}
      // specificProductList={specificProductList.reverse()}
    />
  )
}
