// import { baseURL, withAuthAPIOptionsObj } from '@/processes/services/config/api'
// import { getQueryString } from '../../lib/getQueryString'

// export async function getProductById ({ id }) {
//   try {
//     const query = getQueryString({ id })
//     const response = await fetch(`${baseURL}/products${query}`, withAuthAPIOptionsObj)
//     const { message, data: product } = await response.json()
//     if (!response.ok || message !== 'Success') throw new Error('Could not get products.. :\\')
//     return [...product][0]
//   } catch (error) {
//     console.log('SERVER ERROR */***', error.message)
//     console.table(
//       {
//         'error //-->': error
//       }
//     )
//   }
// }
