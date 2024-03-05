'use client'
import { useCategory } from '../../lib/useCategory'
import TypesPage from '../prodTypes/TypesPage'

export default function CategoryHomePage ({ category }) {
  const { extractObject, isCombo } = useCategory(category)

  return (
    <TypesPage
      category={category}
      subtypes={extractObject ? [...extractObject.sort2ndCriteria] : null}
      isCombo={isCombo}
    />
  )
}
