export const deliverySlice = (set, get) => {
  return {
    selectedDeliveryMethod: null,
    setDeliveryMethod: (method) => set({ selectedDeliveryMethod: method })
  }
}
