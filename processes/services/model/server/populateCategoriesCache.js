import { setProdInFirebaseCache } from '@/processes/cache'
import { getDatabaseCategoriesCollection } from '../../config/firebase/server/model/getDatabaseProductsCollection'
import { MEM_CACHE } from '@/processes/cache/config'

export async function populateCategoriesCache () {
  const { FIREBASE_CACHE: { PRODUCTS: activeCache } } = MEM_CACHE

  let categoriesToCache
  if (process.env.MOCK_DB === 'true' || process.env.NODE_ENV === 'test') {
    console.log(`
      ****/**** RETRIEVING FROM LOCAL MOCK DB ****/****
    `)
    const mockDbModule = await import('@/__mocks/mock_db/initialProdsData.js')

    categoriesToCache = mockDbModule.initialProdsData
  } else if (process.env.NODE_ENV === 'production') {
    console.log(`
      ****/**** RETRIEVING FROM FIREBASE DB ****/****
    `)
    categoriesToCache = await getDatabaseCategoriesCollection()
  }

  await Promise.all(categoriesToCache.map(async ({ firestoreID, categoryData }) => {
    if (!firestoreID || !categoryData) return
    await setProdInFirebaseCache({ category: firestoreID, products: JSON.parse(categoryData) }, activeCache)
  }))
  /* Creating cache logs */
  console.log(`
  CACHE POPULATED/**** data from **> ${activeCache} 
  **> ${categoriesToCache.length} home page categories
  `)
}
