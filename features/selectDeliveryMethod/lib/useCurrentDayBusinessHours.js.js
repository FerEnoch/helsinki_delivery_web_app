import { useAppStore } from '@/entities/lib/store'
import { spanishWeekDay } from '@/entities/lib/timeBlocker/lib/config'
import { getBusinessHoursMessage } from '@/entities/lib/timeBlocker/lib/getBusinessHoursMessage'
import { currrentDay, currentTime } from '@/entities/lib/timeBlocker/lib/getTimeInfo'
import { i18n } from '@/shared/model/i18n'

const { NO_TAKE_AWAY: noTakeAwayMessage, MIDDAY_TAKE_AWAY_POSSIBLE } = i18n.LANG.ESP.UI.TOAST.TIME_BLOCKER

// automatize with API tags ('normal', 'extendido', 'cerrado')
export function useCurrentDayBusinessHours (options) {
  const { isAppBlocked } = useAppStore()
  // console.log(isAppBlocked)
  // console.log(options)

  const stayWithDayBeforeHours = currentTime < 2
  const dayToSeekFor = stayWithDayBeforeHours
    ? (currrentDay === 0 ? 6 : currrentDay - 1)
    : currrentDay

  const currentDaySelect = options?.select.find(({ day }) => day === spanishWeekDay[dayToSeekFor])
  // console.log(currentDaySelect)
  const label = !isAppBlocked && currentDaySelect?.ops[0]?.tag ? options?.label : noTakeAwayMessage

  const message = getBusinessHoursMessage()
  const currentTagSelect = message.match(MIDDAY_TAKE_AWAY_POSSIBLE)
    ? currentDaySelect?.ops
    : (
        currentDaySelect?.ops.length > 1
          ? [currentDaySelect?.ops[1]]
          : currentDaySelect?.ops
      )

  return {
    label,
    select: [{
      day: currentDaySelect?.day,
      ops: currentTagSelect
    }]
  }
}
