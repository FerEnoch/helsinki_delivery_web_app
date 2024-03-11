import { deleteKeyFromMainCache, getFromMainCache, mainCache } from '@/processes/cache'
import { MEM_CACHE } from '@/processes/cache/config'
import MemoryUsage from '@/processes/lib/MemoryUsage'
import 'server-only'
import { revalidatePath } from 'next/cache'
import { populateCategoriesCache } from './populateCategoriesCache'
import { buildInitialProducts } from '../../lib/buildInitialProducts'

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

    if (!activeCacheMap || !activeCacheMap.size) await populateCategoriesCache()

    activeCacheMap = getFromMainCache(activeCache)
    if (activeCacheMap.size > 0) {
      /* Returning from cache logs */
      console.log(`
      Returning ****/CACHE/**** data from **> ${activeCache} 
      **> ${activeCacheMap.size} categories (includ. combos, if any)
      `)
      const initialProducts = buildInitialProducts(activeCacheMap)
      return initialProducts
    } else {
      /** retry... */
      activeCacheMap = getFromMainCache(activeCache)
      const initialProducts = buildInitialProducts(activeCacheMap)
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
