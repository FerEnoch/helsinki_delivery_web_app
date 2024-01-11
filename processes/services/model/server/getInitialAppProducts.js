import { deleteKeyFromMainCache, getFromMainCache, mainCache, setProdInFirebaseCache } from '@/processes/cache'
import { MEM_CACHE } from '@/processes/cache/config'
import MemoryUsage from '@/processes/lib/MemoryUsage'
import { getDatabaseCategoriesCollection } from '../../config/firebase/server/model/getDatabaseProductsCollection'
import 'server-only'
import { revalidatePath } from 'next/cache'

/**
 * Documents types! :
 *  id: { stringValue: id },
 *  category: { stringValue: category },
 *  type: { stringValue: type },
 *  name: { stringValue: name },
 *  description: { stringValue: description },
 *  imageURL: { stringValue: imageURL },
 *  imageID: { stringValue: imageID },
 *  destillery: { stringValue: destillery },
 *  alcohol: { stringValue: alcohol },
 *  stock: { booleanValue: stock },
 *  price: { stringValue: price },
 */

MemoryUsage()
export async function getInitialAppProducts () {
  const { FIREBASE_CACHE: { PRODUCTS: activeCache } } = MEM_CACHE
  try {
    let activeCacheMap = getFromMainCache(activeCache)

    const isCacheToClear = mainCache.get(`STALE_DATA_${activeCache}`)
    if (isCacheToClear) deleteKeyFromMainCache(activeCache)

    if (!activeCacheMap || !activeCacheMap.size) {
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

    activeCacheMap = getFromMainCache(activeCache)

    if (activeCacheMap.size > 0) {
      /* Returning from cache logs */
      console.log(`
      Returning ****/CACHE/**** data from **> ${activeCache} 
      **> ${activeCacheMap.size} categories  
      `)
      const initialProducts = [...activeCacheMap.values()].flatMap(categoryData => JSON.parse(categoryData))
      return initialProducts
    } else {
      /** retry... */
      activeCacheMap = getFromMainCache(activeCache)
      // console.log(activeCacheMap)
      // return [...activeCacheMap.values()].map(prod => JSON.parse(prod)) // old api
      const initialProducts = [...activeCacheMap?.values()].flatMap(categoryData => JSON.parse(categoryData))
      revalidatePath('/')
      return initialProducts
    }
  } catch (error) {
    console.error(`
    Application unabled to compile initial data to render...
    No products were found in firebase 
    `)
    throw new Error(
      `FAILED TO GET INITIAL DATA */** ${error.message} `,
      { cause: `Impossible firebase connection due to => ${error.cause}` }
    )
  }
}
