export function getSortCriteria (products, criteria) {
  const rawSelectedCriteriaFields = products.map((prod) => prod[criteria])
  const criteriaPosibilities = [...new Set(rawSelectedCriteriaFields)]
  return { criteriaFields: criteriaPosibilities }
}
