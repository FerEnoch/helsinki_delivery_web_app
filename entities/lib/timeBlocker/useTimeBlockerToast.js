import { useEffect, useState } from 'react'
import { useTimeBlocker } from './useTimeBlocker'
import { toast } from 'sonner'
import TimeBlockerToast from './ui/TimeBlockerToast'
import { i18n } from '@/shared/model/i18n'

let isFirstTime = true

const {
  TIME_BLOCKER: {
    ADD_TAKE_AWAY,
    BOOK_ORDER_NOT_DELIVERY,
    DISABLED_DAY,
    DISABLED_HOURS
  }
} = i18n.LANG.ESP.UI.TOAST

export default function useTimeBlockerToast () {
  const [disabledApp, setDisabledApp] = useState(null)
  const { businessHoursMessage } = useTimeBlocker()

  useEffect(() => {
    if (!businessHoursMessage) return
    switch (businessHoursMessage) {
      case 'OK': return setDisabledApp(false)
      case ADD_TAKE_AWAY:
      case BOOK_ORDER_NOT_DELIVERY:
        setDisabledApp(false)
        if (isFirstTime) {
          toast((
            <TimeBlockerToast message={businessHoursMessage} />
          ), {
            style: {
              padding: '.5rem'
            },
            position: 'bottom-center',
            duration: 10000,
            important: true
          })
        }
        isFirstTime = false
        break
      case DISABLED_DAY:
      case DISABLED_HOURS:
        return setDisabledApp(true)
    }
  }, [businessHoursMessage])

  return { disabledApp }
}
