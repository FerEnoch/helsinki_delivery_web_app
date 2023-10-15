import { CART_OPERATIONS } from '@/features/addToCart/lib/updateQuantityOperations'

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
          /** CONSULTAR SI EXISTE ALGÚN LÍMITE PARA LA CANTIDAD DE C/PRODUCTO */
          foundProduct.quantity += 1
        }
      }
      set({ cart })
    },
    getCartTotalAmount: () => {
      const cart = get().cart
      return cart.reduce((total, product) => {
        // console.log(total, '+', product.price, '*', product.quantity)
        return total + (Number(product.price) * product.quantity)
      }, 0)
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
