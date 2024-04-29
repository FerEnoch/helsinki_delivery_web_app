import { fetchBusinessHoursData } from '@/entities/cart/services/fetchBusinessHoursData'

export async function getMaxExtendedHour () {
  const { maxExtendedBusinessHours } = await fetchBusinessHoursData()
  return maxExtendedBusinessHours
}
