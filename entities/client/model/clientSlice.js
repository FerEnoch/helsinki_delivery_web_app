export const clientSlice = (set, get) => {
  return {
    client: {},
    setPersonalData: ({ name, address, phone, comments }) => {
      set({
        client: {
          name,
          address,
          phone,
          comments
        }
      })
    }
  }
}
