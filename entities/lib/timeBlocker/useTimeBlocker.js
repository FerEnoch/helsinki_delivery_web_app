import { useEffect, useState } from 'react'
import { getBusinessHoursMessage } from './lib/getBusinessHoursMessage'

export function useTimeBlocker () {
  const [businessHoursMessage, setBusinessHoursMessage] = useState(undefined)

  useEffect(() => {
    const UIMessage = getBusinessHoursMessage()
    setBusinessHoursMessage(UIMessage)
  }, [])

  return {
    businessHoursMessage
  }
}
