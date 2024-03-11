import { i18n } from '@/shared/model/i18n'
import MainErrorBoundary from '@/widgets/error/MainErrorBoundary'
import InfoPageWrapper from '@/widgets/info/InfoPageWrapper'
import ProductDetailPage from '@/entities/product/ui/prodDetail/ProductDetailPage'
import { extract } from '@/processes/services/lib/extract'
import { getInitialAppProducts } from '@/processes/services/model/server/getInitialAppProducts'

export const dynamic = 'force-dynamic'

const notFoundErrorTexts = i18n.LANG.ESP.UI.ERROR.NOT_FOUND

export default async function ProductPage ({ params }) {
  let { id } = params
  id = decodeURIComponent(id)

  const initialProducts = await getInitialAppProducts()

  const { sortedProducts: [product] } = extract(
    initialProducts,
    { criteria: 'id', value: id }
  )

  if (!product) {
    return (
      <InfoPageWrapper>
        <MainErrorBoundary type={notFoundErrorTexts} />
      </InfoPageWrapper>
    )
  }

  return <ProductDetailPage product={product} />
}
