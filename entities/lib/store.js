import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { cartSlice } from '../cart/lib/cartSlice'
import { productsSlice } from '../product/lib/productsSlice'

export const useAppStore = create(
  persist(
    (...args) => ({
      ...productsSlice(...args),
      ...cartSlice(...args)
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ cart: state.cart })
    }
  )
)
