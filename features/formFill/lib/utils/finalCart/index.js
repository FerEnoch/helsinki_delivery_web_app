import { useAppStore } from '@/entities/lib/store'

export function useFinalCart (cart) {
  const { stockProducts } = useAppStore()
  const prodSet = new Set()
  const finalCart = []
  const buildingCart = []

  cart.forEach(item => {
    if (item.isCombo) {
      const comboRepetition = item.quantity
      const comboProducts = item.products
      comboProducts.forEach(([comboProdId, prodQuantity]) => {
        const comboProdQuantity = Number(prodQuantity) * Number(comboRepetition)
        const foundInStock = stockProducts.find(({ id }) => id === comboProdId)
        buildingCart.push({
          ...foundInStock,
          quantity: Number(comboProdQuantity)
        })
        prodSet.add(comboProdId)
      })
    } else {
      buildingCart.push(item)
      prodSet.add(item.id)
    }
  })

  Array.from(prodSet).forEach((uniqueId) => {
    const repetition = buildingCart.filter(({ id }) => uniqueId === id)
    let prodTotalQuantity = 0
    let mergeProd
    repetition.forEach((foundProd, index, foundProdArr) => {
      prodTotalQuantity += Number(foundProd.quantity)
      if (index === foundProdArr.length - 1) {
        mergeProd = {
          ...foundProd,
          quantity: prodTotalQuantity
        }
      }
    })
    if (mergeProd) finalCart.push(mergeProd)
  })

  return finalCart
}
