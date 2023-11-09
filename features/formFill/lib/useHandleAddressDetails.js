import { useCallback, useState } from 'react'

export function useHandleAddressDetails () {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const setDetailsOpenState = useCallback((openState) => setIsDetailsOpen(openState), [])

  return {
    isDetailsOpen,
    setDetailsOpenState
  }
}
