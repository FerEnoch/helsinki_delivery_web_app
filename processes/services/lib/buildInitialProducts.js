export function buildInitialProducts (map) {
  const initialProducts = [...map?.values()].flatMap((categoryData, _, arr) => {
    return JSON.parse(categoryData)
  })

  return initialProducts.map(prod => {
    if (prod.isCombo) {
      prod.description = prod.products.map(([prodId, quantity]) => {
        const { name } = initialProducts.find(({ id }) => id === prodId)
        return [`${name.toUpperCase()} x${quantity}`]
      })
        .join(' +\n')
    }
    return prod
  })
}
