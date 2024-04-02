import { useAppStore } from '@/entities/lib/store'
import { spanishWeekdays } from '@/entities/timeBlocker/lib/config/weekdays'
import { getBusinessHoursMessage } from '@/entities/timeBlocker/lib/getBusinessHoursMessage'
import { currentTime, currrentDay } from '@/entities/timeBlocker/lib/getTimeInfo'
import { maxExendedHour } from '@/entities/timeBlocker/model/buildBusinessHours'
import { i18n } from '@/shared/model/i18n'
import { useState, useEffect } from 'react'

const { NO_TAKE_AWAY: noTakeAwayMessage, MIDDAY_TAKE_AWAY_POSSIBLE } = i18n.LANG.ESP.UI.TOAST.TIME_BLOCKER
const maxExtendedHoursFallback = 6

// automatize with API tags ('normal', 'extendido', 'cerrado')
export function useCurrentDayBusinessHours (options) {
  const { isAppBlocked } = useAppStore()
  const [currentTagSelect, setCurrentTagSelect] = useState(null)

  const stayWithDayBeforeHours = currentTime < (maxExendedHour || maxExtendedHoursFallback)
  const dayToSeekFor = stayWithDayBeforeHours
    ? (currrentDay === 0 ? spanishWeekdays.length - 1 : currrentDay - 1)
    : currrentDay

  const currentDaySelect = options?.select.find(({ day }) => day === spanishWeekdays[dayToSeekFor])
  // console.log(currentDaySelect)
  const label = (!isAppBlocked && currentDaySelect?.ops[0]?.tag) ? options?.label : noTakeAwayMessage

  useEffect(() => {
    getBusinessHoursMessage()
      .then(message => {
        return message?.match(MIDDAY_TAKE_AWAY_POSSIBLE)
          ? currentDaySelect?.ops
          : (
              currentDaySelect?.ops.length > 1
                ? [currentDaySelect?.ops[1]]
                : currentDaySelect?.ops
            )
      }).then(setCurrentTagSelect)
  }, [currentDaySelect])

  return {
    label,
    select: [{
      day: currentDaySelect?.day,
      ops: currentTagSelect
    }]
  }
}
