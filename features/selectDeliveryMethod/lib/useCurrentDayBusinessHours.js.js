import { useAppStore } from '@/entities/lib/store'
import { spanishWeekdays } from '@/entities/timeBlocker/lib/config/weekdays'
import { getBusinessHoursMessage } from '@/entities/timeBlocker/lib/getBusinessHoursMessage'
import { currentTime, currrentDay } from '@/entities/timeBlocker/lib/getTimeInfo'
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

  const currentDaySelect = options?.select.find(({ day }) => day === spanishWeekdays[dayToSeekFor])
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
  // console.log(currentTagSelect)

  // console.log({
  //   label,
  //   select: [{
  //     day: currentDaySelect?.day,
  //     ops: currentTagSelect
  //   }]
  // })

  return {
    label,
    select: [{
      day: currentDaySelect?.day,
      ops: currentTagSelect
    }]
  }
}
