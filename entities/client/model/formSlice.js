export const formSlice = (set, get) => {
  return {
    formLoadingState: false,
    formSuccessfulSubmitOperation: false,
    setFormLoadingState: (bool) => set({ formLoadingState: bool }),
    setFormSuccessfulSubmitOperation: (bool) => set({ formSuccessfulSubmitOperation: bool })
  }
}
