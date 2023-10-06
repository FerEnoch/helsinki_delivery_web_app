import { useAppStore } from '@/entities/lib/store'
import { divideBySubtypes } from '@/processes/services/lib/divideBySubtypes'
import { extract } from '@/processes/services/lib/extract'

export function useCategory (category) {
  const { stockProducts } = useAppStore()
  const { sortPosibilitiesByCriteria: categoryList } = extract([...stockProducts], { criteria: 'category' })

  const [catWithSubtypes, catNotSubtypes] = divideBySubtypes([...stockProducts], categoryList)
  const isInCatWithSubtypes = catWithSubtypes && catWithSubtypes.find(cat => cat === category)
  const isInCatNotSubtypes = catNotSubtypes && catNotSubtypes.find(cat => cat === category)

  const hasSubtypes = isInCatWithSubtypes && !isInCatNotSubtypes
  const extractObject = hasSubtypes && extract(
    [...stockProducts],
    {
      criteria: 'category',
      value: category
    },
    {
      whereField: 'type',
      isEqual: ''
    })

  return {
    extractObject,
    hasSubtypes
  }
}
