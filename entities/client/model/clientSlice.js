export const clientSlice = (set, get) => {
  return {
    client: {},
    setClientName: (name) => set(state => ({ client: { ...state.client, name } })),
    setClientPhone: (phone) => set(state => ({ client: { ...state.client, phone } })),
    setClientAddress: (address) => set(state => ({ client: { ...state.client, ...address } })),
    getClient: () => get().client,
    clearClientData: () => set({ client: {} })
  }
}
