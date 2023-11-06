import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { cartSlice } from '../cart/lib/cartSlice'
import { paymentSlice } from '../payment/model/paymentSlice'
import { productsSlice } from '../product/lib/productsSlice'
import { clientSlice } from '../client/model/clientSlice'

export const useAppStore = create(
  persist(
    (...args) => ({
      ...productsSlice(...args),
      ...cartSlice(...args),
      ...paymentSlice(...args),
      ...clientSlice(...args)
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        cart: state.cart,
        paymentMethod: state.paymentMethod,
        isShareApiCompatible: state.isShareApiCompatible
      })
    }
  )
)
