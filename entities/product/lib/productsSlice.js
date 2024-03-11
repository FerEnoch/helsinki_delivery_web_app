export const productsSlice = (set, get) => {
  return {
    stockProducts: [],
    setInitialStockProducts: (stockProducts) => {
      if (stockProducts.length > 0) set(({ stockProducts }))
    }
  }
}
