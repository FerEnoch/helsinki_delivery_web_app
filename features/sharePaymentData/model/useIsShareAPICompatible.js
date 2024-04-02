import { useEffect, useState } from 'react'

export function useIsShareAPICompatible () {
  const [isCompatible, setIsCompatible] = useState(undefined)

  useEffect(() => {
    setIsCompatible('canShare' in navigator && 'share' in navigator)
  }, [])

  return { isCompatible }
}
