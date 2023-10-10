import CategoryHomePage from '@/entities/product/ui/prodCategories/CategoryHomePage'
import { extract } from '@/processes/services/lib/extract'
import { getInitialAppProducts } from '@/processes/services/model/server/getInitialAppProducts'

export const dynamic = 'force-dynamic'

export default async function CategoryPage ({ params }) {
  let { category } = params
  category = decodeURIComponent(category)

  const initialProducts = await getInitialAppProducts()

  const { sortedProducts: specificProductList } = initialProducts?.length > 0 && extract(
    [...initialProducts],
    { criteria: 'category', value: category }
  )

  return (
    <CategoryHomePage
      category={category}
      specificProductList={[...specificProductList]}
    />
  )
}
