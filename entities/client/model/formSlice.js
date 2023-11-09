export const formSlice = (set, get) => {
  return {
    formData: {},
    clearFormData: () => set({ formData: {} })
  }
}
