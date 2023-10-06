import { baseURL, withAuthAPIOptionsObj } from '../../config/api'
import { getQueryString } from '../../lib/getQueryString'

export async function getProductList () {
  const query = getQueryString({ category: '*', type: '' })
  try {
    const response = await fetch(`${baseURL}/products${query}`, withAuthAPIOptionsObj)
    const { message, data: products } = await response.json()
    if (message === 'Success') {
      return [...products]
    } else {
      throw new Error('Could not get products.. :\\')
    }
  } catch (error) {
    console.log('RETRYING...  */***')
    const response = await fetch(`${baseURL}/products/${query}`, withAuthAPIOptionsObj)
    const { message, data: products } = await response.json()
    if (message === 'Success') {
      return [...products]
    } else {
      throw new Error('Could not get products definitely... :\\')
    }
  }
}
