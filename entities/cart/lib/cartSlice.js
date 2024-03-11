import { CART_OPERATIONS } from '@/features/addToCart/lib/updateQuantityOperations'
import { getCartAmount } from './getCartAmount'
import { priceFormater } from '@/shared/lib/priceFormat/priceFormat'
import { getDeliveryMethods } from '@/features/selectDeliveryMethod/lib/getDeliveryMethods'

export const cartSlice = (set, get) => {
  return {
    cart: [],
    addToCart: (product, newQuantity = 1) => {
      if (!product.stock) return
      const cart = get().cart
      const findProduct = cart.find(prod => prod.id === product.id)
      if (findProduct) {
        const currentQuantity = findProduct.quantity
        findProduct.quantity = Number(currentQuantity) + newQuantity
      } else {
        cart.push({ ...product, quantity: newQuantity })
      }
      set({ cart })
    },
    removeFromCart: (productId) => {
      set({ cart: get().cart.filter(product => product.id !== productId) })
    },
    updateQuantity: (productId, action) => {
      const cart = get().cart
      const foundProduct = cart.find(prod => prod.id === productId)
      if (foundProduct) {
        if (action === CART_OPERATIONS.DECREMENT) {
          if (foundProduct.quantity > 1) {
            foundProduct.quantity -= 1
          } else {
            set({ cart: cart.filter(product => product.id !== foundProduct.id) })
            return
          }
        } else if (action === CART_OPERATIONS.INCREMENT) {
          foundProduct.quantity += 1
        }
      }
      set({ cart })
    },
    getCartTotalAmount: () => {
      const { cart, paymentMethod, selectedDeliveryMethod, setDeliveryMethod } = get()
      if (!selectedDeliveryMethod) {
        getDeliveryMethods().then((methods) => {
          const { label, price, info } = methods.find(({ isDefault }) => isDefault)
          setDeliveryMethod({
            label,
            price,
            info
          })
        })
      }
      const { finalPrice } = getCartAmount({ cart, paymentMethod, selectedDeliveryMethod })
      return priceFormater(finalPrice)
    },
    getProductCurrentQuantity: (id) => {
      const cart = get().cart
      const foundProduct = cart.find(product => product.id === id)
      if (foundProduct) {
        return Number(foundProduct.quantity)
      }
      return 0
    },
    clearCart: () => {
      set({ cart: [] })
    }
  }
}
