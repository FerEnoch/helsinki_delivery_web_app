import { finalBusinessGrid } from '@/__test__/businessHoursAPI'

export async function getBusinessHours () {
  // TO DO -> retrieve data from firebase/cache -> model: app-info
  return JSON.parse(finalBusinessGrid)
}
