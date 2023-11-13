export const formSlice = (set, get) => {
  return {
    formLoadingState: false,
    formSuccessfullSubmitOperation: false,
    setFormLoadingState: (bool) => set({ formLoadingState: bool }),
    setFormSuccessfullSubmitOperation: (bool) => set({ formSuccessfullSubmitOperation: bool })
  }
}
