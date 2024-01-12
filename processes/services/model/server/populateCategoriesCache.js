import { setProdInFirebaseCache } from '@/processes/cache'
import { getDatabaseCategoriesCollection } from '../../config/firebase/server/model/getDatabaseProductsCollection'
import { MEM_CACHE } from '@/processes/cache/config'

export async function populateCategoriesCache () {
  const { FIREBASE_CACHE: { PRODUCTS: activeCache } } = MEM_CACHE

  const initiallCategories = await getDatabaseCategoriesCollection()

  const categoriesToCache = initiallCategories.map(doc => {
    const firestoreDocInfo = doc.data()
    const [firestoreID, categoryData] = Object.entries(firestoreDocInfo).flat()
    return { firestoreID, categoryData }
  })

  categoriesToCache.forEach(async ({ firestoreID, categoryData }) => {
    if (!firestoreID || !categoryData) return
    await setProdInFirebaseCache({ category: firestoreID, products: JSON.parse(categoryData) }, activeCache)
  })
  /* Creating cache logs */
  console.log(`
  CACHE POPULATED/**** data from **> ${activeCache} 
  **> ${categoriesToCache.length} categories
  `)
}
