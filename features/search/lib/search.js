export function search (param, allProducts) {
  // const result = new Set()

  // allProducts.forEach(prod => {
  //   const { category, type, name, description } = prod
  //   if (category.toLowerCase().includes(param)) return result.add(prod)
  //   if (type.toLowerCase().includes(param)) return result.add(prod)
  //   if (name.toLowerCase().includes(param)) return result.add(prod)
  //   if (description.toLowerCase().includes(param)) return result.add(prod)
  // })

  // return Array.from(result)

  return allProducts
    .map(prod => {
      const { category, type, name, description } = prod
      if (category.toLowerCase().includes(param)) return prod
      if (type.toLowerCase().includes(param)) return prod
      if (name.toLowerCase().includes(param)) return prod
      if (description.toLowerCase().includes(param)) return prod
      return null
    })
    .filter(Boolean)
};
