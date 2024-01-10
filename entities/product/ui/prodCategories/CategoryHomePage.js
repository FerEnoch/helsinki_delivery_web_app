'use client'
// import ProductListSlideClient from '@/widgets/sliders/ui/ProductListSlideClient'
import { useCategory } from '../../lib/useCategory'
import TypesPage from '../prodTypes/TypesPage'

export default function CategoryHomePage ({ category /*, specificProductList */ }) {
  const { extractObject /*, hasSubtypes */ } = useCategory(category)

  // if (hasSubtypes) {
  return (
    <TypesPage
      category={category}
      subtypes={extractObject ? [...extractObject.sort2ndCriteria] : null}
    />
  )
  // } else {
  //   return (
  //     <ProductListSlideClient
  //       category={category}
  //       specificProductList={specificProductList}
  //     />
  //   )
  // }
}
