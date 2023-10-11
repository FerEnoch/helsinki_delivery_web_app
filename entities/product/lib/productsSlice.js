export const productsSlice = (set, get) => {
  return {
    stockProducts: [],
    setInitialStockProducts: (databaseDocs) => {
      if (databaseDocs.length > 0) set(({ stockProducts: [...databaseDocs] }))
    }
  }
}
