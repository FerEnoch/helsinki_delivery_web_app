import { useAppStore } from '@/entities/lib/store'

export function useFinalCart (cart) {
  const { stockProducts } = useAppStore()

  const finalCart = []

  cart.forEach(item => {
    if (item.isCombo) {
      const comboRepetition = item.quantity
      const comboProducts = item.products
      comboProducts.forEach(([comboProdId, prodQuantity]) => {
        const comboProdQuantity = Number(prodQuantity) * Number(comboRepetition)

        const foundInStock = stockProducts.find(({ id }) => id === comboProdId)
        const foundInCart = cart.find(({ id }) => id === comboProdId)
        if (foundInCart) {
          finalCart.push({
            ...foundInCart,
            quantity: foundInCart.quantity + comboProdQuantity
          })
        } else {
          finalCart.push({
            ...foundInStock,
            quantity: comboProdQuantity
          })
        }
      })
    }
  })

  const individualProdSet = new Set()
  cart.forEach(prod => {
    if (prod.isCombo) return
    individualProdSet.add(prod.id)
    const alreadyAdded = finalCart.find(({ id }) => id === prod.id)
    if (!alreadyAdded) {
      finalCart.push(prod)
    } else {
      console.log(`repeated prod -> ${prod.id}`)
      const repeatedProds = finalCart.filter(({ id }) => id === prod.id)
      repeatedProds.forEach(prodInCart => {
        if (individualProdSet.has(prodInCart.id)) return
        console.log('entering') // ---- nada --------
        finalCart.push({
          ...prodInCart,
          quantity: prodInCart.quantity * repeatedProds.length
        })
      })
    }
  })

  return finalCart
}
