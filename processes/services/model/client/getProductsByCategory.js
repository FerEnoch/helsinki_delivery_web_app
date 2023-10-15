// import { baseURL, withAuthAPIOptionsObj } from '../../config/api'
// import { getQueryString } from '../../lib/getQueryString'

// export async function getProductsByCategory ({ category }) {
//   const query = getQueryString({ category })
//   try {
//     const response = await fetch(`${baseURL}/products/categories${query}`, withAuthAPIOptionsObj)
//     const { message, data: { sortPosibilitiesByCriteria, sortedProducts } } = await response.json()
//     if (message === 'Success') {
//       return (
//         {
//           categories: [...sortPosibilitiesByCriteria],
//           products: [...sortedProducts]
//         }
//       )
//     } else {
//       throw new Error('Could not get categories.. :\\')
//     }
//   } catch (error) {
//     console.log('RETRYING...  */***')
//     const response = await fetch(`${baseURL}/products/categories${query}`, withAuthAPIOptionsObj)
//     const { message, data } = await response.json()
//     if (message === 'Success') {
//       return (
//         {
//           categories: [...data.sortPosibilitiesByCriteria],
//           products: [...data.sortedProducts]
//         }
//       )
//     } else {
//       throw new Error('Could not get categories definitely... :\\')
//     }
//   }
// }
