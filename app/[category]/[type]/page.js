import { extract } from '@/processes/services/lib/extract'
import { getInitialAppProducts } from '@/processes/services/model/server/getInitialAppProducts'
import ProductListSlideClient from '@/widgets/sliders/ui/ProductListSlideClient'

export const dynamic = 'force-dynamic'

export default async function TypePage ({ params }) {
  let { category, type } = params
  category = decodeURIComponent(category)
  type = decodeURIComponent(type)

  const initialProducts = await getInitialAppProducts()

  const { sortedProducts: specificProductList } = initialProducts?.length > 0 && extract(
    [...initialProducts],
    { criteria: 'category', value: category },
    { whereField: 'type', isEqual: type || '*' }
  )

  return (
    <ProductListSlideClient
      category={category}
      type={type || ''}
      specificProductList={[...specificProductList]}
    />
  )
}
