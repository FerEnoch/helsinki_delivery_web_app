import { deliverySlice } from '../../features/selectDeliveryMethod/lib/deliverySlice'
import { timeBlockerSlice } from './timeBlocker/lib/timeBlockerSlice.js'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { cartSlice } from '../cart/lib/cartSlice'
import { paymentSlice } from '../payment/model/paymentSlice'
import { productsSlice } from '../product/lib/productsSlice'
import { clientSlice } from '../client/model/clientSlice'
import { formSlice } from '../client/model/formSlice'

export const useAppStore = create(
  persist(
    (...args) => ({
      ...productsSlice(...args),
      ...cartSlice(...args),
      ...deliverySlice(...args),
      ...paymentSlice(...args),
      ...clientSlice(...args),
      ...formSlice(...args),
      ...timeBlockerSlice(...args)
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => sessionStorage), /* eslint-disable-line */
      partialize: (state) => ({
        cart: state.cart,
        selectedDeliveryMethod: state.selectedDeliveryMethod,
        isShareApiCompatible: state.isShareApiCompatible
        // isAppBlocked: state.isAppBlocked
      })
    }
  )
)
