export const timeBlockerSlice = (set, get) => {
  return {
    isAppBlocked: null,
    setIsAppBlocked: (bool) => set(({ isAppBlocked: bool }))
  }
}
