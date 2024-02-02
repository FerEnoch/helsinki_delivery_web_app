export const formSlice = (set, get) => {
  return {
    showPurchaseSummary: true,
    togglePurchaseSummary: () => {
      const currentShowState = get().showPurchaseSummary
      set({ showPurchaseSummary: !currentShowState })
    },
    formLoadingState: false,
    formSuccessfulSubmitOperation: false,
    setFormLoadingState: (bool) => set({ formLoadingState: bool }),
    setFormSuccessfulSubmitOperation: (bool) => set({ formSuccessfulSubmitOperation: bool })
  }
}
