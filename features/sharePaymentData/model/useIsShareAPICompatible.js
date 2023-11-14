import { useEffect, useState } from 'react'

export function useIsShareAPICompatible () {
  const [isCompatible, setIsCompatible] = useState(undefined)

  // const isCompatibleShareAPI = navigator.share().catch(() => {})
  useEffect(() => {
    setIsCompatible('canShare' in navigator && 'share' in navigator)
  }, [])

  return { isCompatible }
}
