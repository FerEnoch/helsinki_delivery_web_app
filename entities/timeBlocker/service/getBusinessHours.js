import { finalBusinessGrid } from '@/__test__/businessHoursAPI'

export async function getBusinessHours () {
  // TO DO
  //  fetch from endpoint, which retrieves from firebase / cache
  return JSON.parse(finalBusinessGrid)
}
