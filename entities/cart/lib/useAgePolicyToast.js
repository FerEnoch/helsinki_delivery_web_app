import { useEffect } from 'react'
import { toast } from 'sonner'
import AgePolicyToast from '../ui/AgePolicyToast'

let isFirstTime = true

export default function useAgePolicyToast () {
  useEffect(() => {
    if (isFirstTime) {
      toast((
        <AgePolicyToast />
      ), {
        position: 'bottom-center',
        duration: 10000,
        important: true
      })
    }
    isFirstTime = false
  }, [])
}
