import { useAppStore } from '@/entities/lib/store'
import { divideBySubtypes } from '@/processes/services/lib/divideBySubtypes'
import { extract } from '@/processes/services/lib/extract'
import { useEffect, useMemo, useState } from 'react'

export function useCategory (category) {
  const { stockProducts } = useAppStore()
  const [isCombo, setIsCombo] = useState(null)
  const { sortPosibilitiesByCriteria: categoryList } = useMemo(() => extract(stockProducts, { criteria: 'category' }), [stockProducts])

  const [catWithSubtypes, catNotSubtypes] = useMemo(() => divideBySubtypes(stockProducts, categoryList),
    [stockProducts, categoryList])

  const isInCatWithSubtypes = catWithSubtypes && catWithSubtypes.find(cat => cat === category)
  const isInCatNotSubtypes = catNotSubtypes && catNotSubtypes.find(cat => cat === category)

  const hasSubtypes = isInCatWithSubtypes && !isInCatNotSubtypes
  const extractObject = useMemo(() => hasSubtypes && extract(
    stockProducts,
    {
      criteria: 'category',
      value: category
    },
    {
      whereField: 'type',
      isEqual: ''
    })
  , [stockProducts, category, hasSubtypes])

  useEffect(() => {
    const combosSet = new Set()
    stockProducts.filter(({ isCombo }) => isCombo).forEach(({ category }) => combosSet.add(category))
    setIsCombo(combosSet.has(category))
  }, [stockProducts, category])

  return {
    extractObject,
    hasSubtypes,
    isCombo
  }
}
