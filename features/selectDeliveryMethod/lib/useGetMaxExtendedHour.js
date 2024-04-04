import { getBusinessHours } from '@/entities/timeBlocker/service/getBusinessHours'

export async function getMaxExtendedHour () {
  const {
    businessHours: { takeAway: takeAwayHours, delivery: deliveryHours }
  } = await getBusinessHours()
  return Math.max(deliveryHours.extendedNight.to, takeAwayHours.extendedNight.to)
}
