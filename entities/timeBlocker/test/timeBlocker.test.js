import { describe, expect, it } from 'vitest'
import { currentTime, currrentDay } from '../lib/getTimeInfo'
import { businessHoursMap } from '../model/businessHoursMap'
import { weekdays } from '../lib/config/weekdays'

describe('Time blocker', () => {
  it('Should return client current weekday and time in number format type', () => {
    expect(currentTime).toBeTypeOf('number')
    expect(currrentDay).toBeTypeOf('number')
  })

  it('Should build up the week business hours map correctly', () => {
    expect(businessHoursMap.size).toBe(Object.values(weekdays).length)
  })
})
