export const productsSlice = (set, get) => {
  return {
    stockProducts: [],
    setInitialStockProducts: (databaseDocs) => {
      if (databaseDocs.length > 0) set(({ stockProducts: [...databaseDocs] }))
    }
    // setInitialStockProducts: (snapshotDocChanges) => {
    //   const currentProducts = get().stockProducts
    //   const updatedProducts = []

    //   snapshotDocChanges.forEach(change => {
    //     const product = change.doc.data()
    //     console.table([product, change.type])

    //     const isInStore = currentProducts.find((prod) => prod.id === product.id)

    //     if (change.type === 'added' && !isInStore) updatedProducts.push(product)
    //     if (change.type === 'modified') updatedProducts.push(product)
    //     // if (change.type === 'removed')
    //   })
    //   set(({ stockProducts: [...updatedProducts] }))
    // }
  }
}
