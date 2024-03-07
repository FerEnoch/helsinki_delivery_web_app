import { useAppStore } from '@/entities/lib/store'

export function useFinalCart () {
  const { stockProducts, cart } = useAppStore()

  const finalCart = []
  cart.forEach((prod, _, cartArr) => {
    if (prod.isCombo) {
      prod.products
        .forEach(([comboProdId, comboProdQuantity]) => {
          const foundInStock = stockProducts.find(({ id }) => id === comboProdId)
          if (foundInStock) {
            const foundInCart = cartArr.find(({ id }) => id === comboProdId)
            if (foundInCart) {
              if (finalCart.find(({ id }) => id === foundInCart.id)) {
                finalCart.push({
                  ...foundInCart,
                  quantity: foundInCart.quantity + Number(comboProdQuantity)
                })
              }
            } else {
              finalCart.push({
                ...foundInStock,
                quantity: Number(comboProdQuantity)
              })
            }
          }
        })
    } else {
      if (!finalCart.find(({ id }) => id === prod.id)) finalCart.push(prod)
    }
  })
  console.log(finalCart.map(({ id, quantity }) => ({ id, quantity })))

  return finalCart
}
