import { useAppStore } from '@/entities/lib/store'
import { spanishWeekdays } from '@/entities/timeBlocker/lib/config/weekdays'
import { getBusinessHoursMessage } from '@/entities/timeBlocker/lib/getBusinessHoursMessage'
import { currentTime, currrentDay } from '@/entities/timeBlocker/lib/getTimeInfo'
import { i18n } from '@/shared/model/i18n'
import { useState, useEffect } from 'react'
import { getMaxExtendedHour } from './useGetMaxExtendedHour'

const { NO_TAKE_AWAY: noTakeAwayMessage, MIDDAY_TAKE_AWAY_POSSIBLE } = i18n.LANG.ESP.UI.TOAST.TIME_BLOCKER

export function useCurrentDayBusinessHours (options) {
  const { isAppBlocked } = useAppStore()
  const [currentTagSelect, setCurrentTagSelect] = useState(null)
  const [maxExtendedHour, setMaxExtendedHour] = useState(6)

  useEffect(() => {
    getMaxExtendedHour().then(setMaxExtendedHour)
  }, [])

  const dayBeforeHours = currentTime < maxExtendedHour
  const dayToSeekFor = dayBeforeHours
    ? (currrentDay === 0 ? spanishWeekdays.length - 1 : currrentDay - 1)
    : currrentDay

  const currentDaySelect = options?.select?.find(({ day }) => day === spanishWeekdays[dayToSeekFor])
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
