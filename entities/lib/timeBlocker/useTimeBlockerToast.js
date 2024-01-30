import { useEffect } from 'react'
import { useTimeBlocker } from './useTimeBlocker'
import { toast } from 'sonner'
import TimeBlockerToast from './ui/TimeBlockerToast'
import { i18n } from '@/shared/model/i18n'
import { useAppStore } from '../store'

const {
  TIME_BLOCKER: {
    BOOK_ORDER_NOT_DELIVERY,
    DISABLED_DAY,
    DISABLED_HOURS
  }
} = i18n.LANG.ESP.UI.TOAST

export default function useTimeBlockerToast () {
  const { setIsAppBlocked } = useAppStore()
  const { businessHoursMessage } = useTimeBlocker()

  useEffect(() => {
    if (!businessHoursMessage) return
    switch (businessHoursMessage) {
      case 'OK': return setIsAppBlocked(false)
      case BOOK_ORDER_NOT_DELIVERY:
        setIsAppBlocked(false)
        toast((
          <TimeBlockerToast message={businessHoursMessage} />
        ), {
          style: {
            padding: '.5rem'
          },
          position: 'bottom-center',
          duration: 30000,
          important: true
        })
        break
      case DISABLED_DAY:
      case DISABLED_HOURS:
        return setIsAppBlocked(true)
    }
  }, [businessHoursMessage, setIsAppBlocked])
}
