export function formatReturnProducts (products) {
  if (typeof products === 'object') return [...products]
  return products
}
