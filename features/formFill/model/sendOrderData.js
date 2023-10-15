import { baseURL } from '@/processes/services/config/api'

export async function sendOrderData (incomingOrder) {
  try {
    const response = await fetch(`${baseURL}/submit`, {
      method: 'POST',
      body: incomingOrder,
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY
      }
    })

    if (response.status !== 200) {
      console.error('bad request!')
      return { message: 'Could NOT send order' }
    }

    return await response.json()
  } catch (error) {
    /** retrying.. */
    const response = await fetch(`${baseURL}/submit`, {
      method: 'POST',
      body: incomingOrder,
      headers: {
        'content-type': 'multipart/form-data',
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY
      }
    })

    if (response.status !== 200) {
      console.error('bad request!')
      return { message: 'Could NOT send order' }
    }

    return await response.json()
  }
}
