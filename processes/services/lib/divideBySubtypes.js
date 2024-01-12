import { extract } from './extract'

export function divideBySubtypes (currentStockProducts, categoryList) {
  const withSubtypes = []
  const notSubtypes = []
  for (const category of categoryList) {
    const { sort2ndCriteria: typeList } = extract(
      currentStockProducts,
      {
        criteria: 'category',
        value: category
      },
      {
        whereField: 'type',
        isEqual: ''
      })

    if (isOnlyOneCategory(typeList)) {
      notSubtypes.push(category)
    } else {
      withSubtypes.push(category)
    }
  }
  return [withSubtypes, notSubtypes]
}

function isOnlyOneCategory (typelist) {
  return typelist.length === 0 // || typelist.length === 1
}
