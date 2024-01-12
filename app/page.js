import CategoryList from '@/entities/product/ui/prodCategories/CategoryList'
import { extract } from '@/processes/services/lib/extract'
import { getInitialAppProducts } from '@/processes/services/model/server/getInitialAppProducts'
import Social from '@/widgets/social/ui/Social'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export default async function MainPage () {
  const initialProducts = await getInitialAppProducts()
  if (!initialProducts.length) revalidatePath('/')

  const { sortPosibilitiesByCriteria: categories } = initialProducts?.length > 0 && extract(
    [...initialProducts],
    { criteria: 'category', value: '*' }
  )

  return (
    <>
      <CategoryList categories={categories} />
      <Social />
    </>
  )
}
