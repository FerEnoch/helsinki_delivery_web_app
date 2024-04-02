import { describe, expect, it } from 'vitest'
import { currentTime, currrentDay } from '../lib/getTimeInfo'
import { buildBusinessHours } from '../model/buildBusinessHours'
import { weekdays } from '../lib/config/weekdays'

describe('Time blocker', () => {
  it('Should return client current weekday and time in number format type', () => {
    expect(currentTime).toBeTypeOf('number')
    expect(currrentDay).toBeTypeOf('number')
  })

  it('Should build up the week business hours map correctly', async () => {
    const { daysGrid } = await buildBusinessHours()
    expect(daysGrid.size).toBe(weekdays.length)
  })
})
