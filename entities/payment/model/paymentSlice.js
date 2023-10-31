import { PAYMENT_OPTIONS } from '@/shared/model/i18n/payment_options'

export const paymentSlice = (set, get) => {
  return {
    paymentMethod: {},
    pickPaymentOption: (selectedId) => {
      if (!selectedId) {
        set({ paymentMethod: {} })
        return
      }
      const [chosenPaymentOption] = PAYMENT_OPTIONS.filter(({ id }) => id === selectedId)
      const { id, label, receipt } = chosenPaymentOption
      set({ paymentMethod: { id, label, receipt } })
    },
    clearPaymentMethod: () => set({ paymentMethod: {} })
  }
}
