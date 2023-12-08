import { toast } from 'sonner'
import { useEffect } from 'react'
import DiscountToast from '../ui/lib/DiscountToast'

let isFirstTime = true

export function useDicountToast () {
  useEffect(() => {
    if (isFirstTime) {
      toast((
        <DiscountToast />
      ), {
        style: {
          padding: 0
        },
        duration: 8000,
        position: 'bottom-center'
      })
    }
    isFirstTime = false
  }, [])
}
