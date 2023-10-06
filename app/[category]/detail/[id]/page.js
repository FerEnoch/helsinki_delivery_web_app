import ProductDetailPage from '@/entities/product/ui/prodDetail/ProductDetailPage'
import { extract } from '@/processes/services/lib/extract'
import { getInitialAppProducts } from '@/processes/services/model/server/getInitialAppProducts'

export const dynamic = 'force-dynamic'

export default async function ProductPage ({ params }) {
  const { id } = params
  const initialProducts = await getInitialAppProducts()
  const { sortedProducts: [product] } = extract(
    [...initialProducts],
    { criteria: 'id', value: decodeURIComponent(id) }
  )

  return <ProductDetailPage product={{ ...product }} />
}
