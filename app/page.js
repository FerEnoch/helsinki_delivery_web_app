import CategoryList from '@/entities/product/ui/prodCategories/CategoryList'
import { extract } from '@/processes/services/lib/extract'
import { getInitialAppProducts } from '@/processes/services/model/server/getInitialAppProducts'
import Social from '@/widgets/social/ui/Social'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export default async function MainPage () {
  const initialProducts = await getInitialAppProducts()
  if (!initialProducts.length) revalidatePath('/')

  const stockProds = initialProducts.filter(({ isCombo }) => !isCombo)
  const { sortPosibilitiesByCriteria: categories } = extract(
    stockProds,
    { criteria: 'category', value: '*' }
  )

  const combos = initialProducts.filter(({ isCombo }) => isCombo)
  const combosLabels = [...new Set(combos.map(combo => combo?.category))]

  return (
    <>
      <CategoryList categories={categories} combosLabels={combosLabels} />
      <Social />
    </>
  )
}
