import { toast } from 'sonner'
import { useEffect } from 'react'
import DiscountToast from '../ui/lib/DiscountToast'
import { useAppStore } from '@/entities/lib/store'
import { useTimeBlocker } from '@/entities/lib/timeBlocker/useTimeBlocker'
import { i18n } from '@/shared/model/i18n'
import BlockedAppToast from '@/entities/lib/timeBlocker/ui/BlockedAppToast'

const {
  TIME_BLOCKER: {
    ADD_TAKE_AWAY,
    BOOK_ORDER_NOT_DELIVERY,
    DISABLED_DAY,
    DISABLED_HOURS
  }
} = i18n.LANG.ESP.UI.TOAST

let isFirstTime = true

export function useInitialToast () {
  const { isAppBlocked, setIsAppBlocked } = useAppStore()
  const { businessHoursMessage } = useTimeBlocker()

  useEffect(() => {
    if (!isFirstTime) return
    if (!businessHoursMessage) return

    switch (businessHoursMessage) {
      case 'OK': return setIsAppBlocked(false)
      case ADD_TAKE_AWAY:
      case BOOK_ORDER_NOT_DELIVERY:
        setIsAppBlocked(false)
        break
      case DISABLED_DAY:
      case DISABLED_HOURS:
        isFirstTime = false
        setIsAppBlocked(true)
        toast((
          <BlockedAppToast message={businessHoursMessage} />
        ), {
          style: {
            padding: '.5rem'
          },
          position: 'bottom-center',
          duration: 10000,
          important: true
        })
        break
    }
  }, [businessHoursMessage, setIsAppBlocked])

  useEffect(() => {
    if (!isFirstTime) return
    if (!businessHoursMessage) return
    if (isAppBlocked) return

    isFirstTime = false
    toast((
      <DiscountToast />
    ), {
      style: {
        backgroundColor: 'rgb(210, 256, 210)',
        padding: '.5rem'
      },
      duration: 6000,
      position: 'bottom-center',
      important: true
    })
  }, [isAppBlocked, businessHoursMessage])
}
