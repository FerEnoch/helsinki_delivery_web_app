import { MEM_CACHE } from '@/processes/cache/config'
import { deleteKeyFromMainCache, getFromMainCache, mainCache } from '@/processes/cache'
import { getPaymentMethodsCollection } from './getPaymentMethodsCollection'

export async function getPaymentMethodsFromCacheOrFirestore () {
  const { FIREBASE_CACHE: { PAYMENT_METHODS: activeCache } } = MEM_CACHE

  let activeCacheMap
  try {
    activeCacheMap = getFromMainCache(activeCache)
    const isCacheToClear = mainCache.get(`STALE_DATA_${activeCache}`)
    if (isCacheToClear) deleteKeyFromMainCache(activeCache)

    if (!activeCacheMap || !activeCacheMap.size) {
      const paymentMethodsToCache = await getPaymentMethodsCollection()
      activeCacheMap.set(activeCache, JSON.stringify(paymentMethodsToCache))
      /* Creating cache loggin */
      console.log(`
      CACHE POPULATED/**** data from **> ${activeCache} 
      **> ${paymentMethodsToCache.length} payment methods`)
      return [paymentMethodsToCache]
    }

    activeCacheMap = getFromMainCache(activeCache)
    if (activeCacheMap.size > 0) {
    /* Returning from cache loggin */
      console.log(`
      Returning ****/CACHE/**** data from **> ${activeCache}
      `)
      return [...activeCacheMap.values()].map(item => JSON.parse(item))
    } else {
      /** retry... */
      activeCacheMap = getFromMainCache(activeCache)
      return [...activeCacheMap.values()].map(item => JSON.parse(item))
    }
  } catch (error) {
    console.error(`
    Application unabled to compile payment methods collection...
    No payment methods were found in firebase
    `)
    throw new Error(
      `FAILED TO GET INITIAL DATA */** ${error.message} `,
      { cause: `Impossible firebase connection due to => ${error.cause}` }
    )
  }
}
