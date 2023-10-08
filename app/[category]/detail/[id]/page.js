import ProductDetailPage from '@/entities/product/ui/prodDetail/ProductDetailPage'
import { extract } from '@/processes/services/lib/extract'
import { getInitialAppProducts } from '@/processes/services/model/server/getInitialAppProducts'

export const dynamic = 'force-dynamic'

export default async function ProductPage ({ params }) {
  let { id } = params
  id = decodeURIComponent(id)

  const initialProducts = await getInitialAppProducts()

  const { sortedProducts: [product] } = extract(
    [...initialProducts],
    { criteria: 'id', value: id }
  )

  return <ProductDetailPage product={{ ...product }} />
}
