import { PAYMENT_OPTIONS } from '@/shared/model/payment_options'

export const paymentSlice = (set, get) => {
  return {
    paymentMethod: {},
    QRService: {},
    chosenTransferData: {},
    receiptFile: null,
    pickPaymentOption: (selectedId) => {
      if (!selectedId) {
        set({ paymentMethod: {} })
        return
      }
      const [chosenPaymentOption] = PAYMENT_OPTIONS.filter(({ id }) => id === selectedId)
      const { id, label, receipt, isCash } = chosenPaymentOption
      set({ paymentMethod: { id, label, receipt, isCash } })
    },
    pickQRService: (service) => {
      set({ QRService: { ...service } })
    },
    clearPaymentSlice: () => set({ paymentMethod: {}, QRService: {} }),
    setChosenTransferData: (transferData) => set({ chosenTransferData: { ...transferData } }),
    uploadReceiptFile: (file) => set({ receiptFile: file }),
    deleteReceiptFile: () => set({ receiptFile: null })
  }
}
