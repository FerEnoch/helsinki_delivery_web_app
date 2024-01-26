import { spanishWeekDay } from '@/entities/lib/timeBlocker/lib/config'
import { currrentDay } from '@/entities/lib/timeBlocker/lib/getTimeInfo'

export function useCurrentDayBusinessHours (options) {
  return {
    label: options?.label,
    select: [options?.select.find(({ day }) => day === spanishWeekDay[currrentDay])]
  }
}
