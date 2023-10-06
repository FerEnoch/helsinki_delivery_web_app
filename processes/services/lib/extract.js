import { getSortCriteria } from '@/processes/services/lib/getSortCriteria'

export function extract (initialStockProducts, { criteria, value = '' }, must) {
  if (!criteria) { return console.error('Provide a valid sorting criteria please') }

  const { criteriaFields } = getSortCriteria(initialStockProducts, criteria)

  let sortedProducts
  let sortInfo

  if (criteria !== 'id' && value === '') {
    sortInfo = {
      sortPosibilitiesByCriteria: criteriaFields,
      sortedProducts: 'please enter a value to sort products',
      sort2ndCriteria: must?.whereField ? must.whereField : 'no must-value entered'
    }
    return sortInfo
  }

  if (value === '*') {
    sortInfo = {
      sortPosibilitiesByCriteria: criteriaFields,
      sortedProducts: [...initialStockProducts],
      sort2ndCriteria: must?.whereField ? must.whereField : 'no must-value entered'
    }
    return sortInfo
  }

  if (!must) {
    sortedProducts = initialStockProducts.filter((prod) => prod[criteria] === value)
    sortInfo = {
      sortPosibilitiesByCriteria: criteriaFields,
      sort2ndCriteria: { [criteria]: [value] },
      sortedProducts
    }
    return sortInfo
  }

  if (!must?.whereField) {
    sortInfo = {
      sortPosibilitiesByCriteria: criteriaFields,
      sortedProducts: 'Please enter a must-be field or remove the must option'
    }
  } else if (must.whereField && !must.isEqual) {
    const sort2ndCriteriaFilter = initialStockProducts
      .filter((prod) => prod[criteria] === value)
      .map((prod) => prod[must.whereField])
    sortInfo = {
      sortPosibilitiesByCriteria: [value],
      sort2ndCriteria: [...new Set(sort2ndCriteriaFilter)],
      sortedProducts: 'no sort'
    }
  } else if (must.whereField && must.isEqual) {
    sortedProducts = initialStockProducts.filter(
      (prod) =>
        prod[must.whereField] === must.isEqual && prod[criteria] === value
    )
    if (must.isEqual === '*') {
      sortedProducts = initialStockProducts.filter(prod => prod[criteria] === value)
    }
    sortInfo = {
      sortPosibilitiesByCriteria: criteriaFields,
      sort2ndCriteria: { [criteria]: { [value]: { [must.whereField]: must.isEqual } } },
      sortedProducts: sortedProducts.length > 0 ? sortedProducts : 'No products found with theese options'
    }
  } else {
    sortedProducts = initialStockProducts.filter((prod) => prod[criteria] === value)
    sortInfo = {
      sortPosibilitiesByCriteria: criteriaFields,
      sortedProducts: sortedProducts.length ? sortedProducts : 'No products found with theese options'
    }
  }

  if (criteria === 'id' && value !== '') {
    const product = initialStockProducts.find(prod => prod.id === value)
    sortInfo = {
      product: value ? (product || 'No product found with current ID') : 'Please insert a valid Id'
    }
  }
  return sortInfo
}
