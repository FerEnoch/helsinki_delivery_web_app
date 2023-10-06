import { extract } from '@/processes/services/lib/extract'
import { getInitialAppProducts } from '@/processes/services/model/server/getInitialAppProducts'
import ProductListSlideClient from '@/widgets/sliders/ui/ProductListSlideClient'

export const dynamic = 'force-dynamic'

export default async function TypePage ({ params }) {
  const { category, type } = params

  const initialProducts = await getInitialAppProducts()

  const { sortedProducts: specificProductList } = initialProducts.length > 0 && extract(
    [...initialProducts],
    { criteria: 'category', value: decodeURI(category) },
    { whereField: 'type', isEqual: type ? decodeURI(type) : '*' }
  )

  return (
    <ProductListSlideClient
      category={decodeURI(category)}
      type={type ? decodeURI(type) : ''}
      specificProductList={[...specificProductList]}
    />
  )
}
