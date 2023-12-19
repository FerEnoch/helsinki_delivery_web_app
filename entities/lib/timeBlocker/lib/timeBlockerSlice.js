export const timeBlockerSlice = (set, get) => {
  return {
    isAppBlocked: false,
    setIsAppBlocked: (bool) => set(({ isAppBlocked: bool }))
  }
}
