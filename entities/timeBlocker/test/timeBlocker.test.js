import { describe, expect, it } from 'vitest'
import { currentTime, currrentDay } from '../lib/getTimeInfo'
import { businessHoursMap } from '../model/businessHoursMap'

describe('Time blocker', () => {
  it('Should return client current weekday and time in number format type', () => {
    expect(currentTime).toBeTypeOf('number')
    expect(currrentDay).toBeTypeOf('number')
  })

  it('Should build up the business hours map correctly', () => {
    expect(businessHoursMap).toBeInstanceOf(Map)
  })
})
