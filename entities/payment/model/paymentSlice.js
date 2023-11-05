import { PAYMENT_OPTIONS } from '@/shared/model/i18n/payment_options'

export const paymentSlice = (set, get) => {
  return {
    paymentMethod: {},
    QRService: {},
    isQRShareable: false,
    chosenTransferData: {},
    pickPaymentOption: (selectedId) => {
      if (!selectedId) {
        set({ paymentMethod: {} })
        return
      }
      const [chosenPaymentOption] = PAYMENT_OPTIONS.filter(({ id }) => id === selectedId)
      const { id, label, receipt } = chosenPaymentOption
      set({ paymentMethod: { id, label, receipt } })
    },
    pickQRService: (service) => {
      set({ QRService: { ...service } })
    },
    setIsQRShareable: (bool) => set({ isQRShareable: bool }),
    clearPaymentSlice: () => set({ paymentMethod: {}, QRService: {} }),
    setChosenTransferData: (transferData) => set({ chosenTransferData: { ...transferData } })
  }
}
