import { baseURL, withAuthAPIOptionsObj } from '@/processes/services/config/api'

export async function fetchBusinessHoursData () {
  try {
    const response = await fetch(`${baseURL}/businessHours`, withAuthAPIOptionsObj)
    const { message, data } = await response.json()
    if (message === 'Success') {
      return JSON.parse(data)
    } else {
      throw new Error('Could not get busines hours.. :\\')
    }
  } catch (error) {
    /** retrying.. */
    console.error(error.message)
    const response = await fetch(`${baseURL}/businessHours`, withAuthAPIOptionsObj)
    const { message, data } = await response.json()
    if (message === 'Success') {
      return JSON.parse(data)
    } else {
      throw new Error('Could not get business hours definitely... :\\')
    }
  }
}
