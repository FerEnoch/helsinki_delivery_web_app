import { deleteKeyFromMainCache, getFromMainCache, mainCache, setProdInFirebaseCache } from '@/processes/cache'
import { MEM_CACHE } from '@/processes/cache/config'
import MemoryUsage from '@/processes/lib/MemoryUsage'
import { getDatabaseProductsCollection } from '../../config/firebase/server/model/getDatabaseProductsCollection'
import 'server-only'
import { getAppInfo } from './getAppInfo'

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
 *  stock: { booleanValue: stock },  ******different one**********//****
 *  price: { stringValue: price },
 */

MemoryUsage()
export async function getInitialAppProducts () {
  try {
    await getAppInfo()
    const activeCache = MEM_CACHE.FIREBASE_DATABASE
    let activeCacheMap = getFromMainCache(activeCache)

    const isCacheToClear = mainCache.get(`STALE_DATA_${activeCache}`)
    if (isCacheToClear) deleteKeyFromMainCache(activeCache)

    if (!activeCacheMap || !activeCacheMap.size) {
      const databaseProducts = await getDatabaseProductsCollection()
      const cacheProds = Promise.all(databaseProducts.map(async product => {
        await setProdInFirebaseCache(product, activeCache)
        return product.id
      }))
      /* Creating cache loggin */
      console.log(`
      CACHE POPULATED/**** data from **> ${activeCache} 
      **> ${(await cacheProds).length} products
      `)
    }

    activeCacheMap = getFromMainCache(activeCache)
    if (activeCacheMap.size > 0) {
      /* Returning from cache loggin */
      console.log(`
      Returning ****/CACHE/**** data from **> ${activeCache} 
      **> ${activeCacheMap.size} products  
      `)
      return [...activeCacheMap.values()].map(prod => JSON.parse(prod))
    } else {
      /** retry... */
      activeCacheMap = getFromMainCache(activeCache)
      return [...activeCacheMap.values()].map(prod => JSON.parse(prod))
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
