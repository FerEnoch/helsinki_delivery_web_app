import { MEM_CACHE } from '@/processes/cache/config'
import { FIREBASE_DATABASES } from '../../databases'
import { firestoreDatabaseAdmin } from '../config'
import { deleteKeyFromMainCache, getFromMainCache, mainCache } from '@/processes/cache'
import { getBucketImageURL } from './getBucketImageURL'

export async function getPaymentMethodsCollection () {
  const { PAYMENT_METHODS } = FIREBASE_DATABASES
  const { FIREBASE_DATABASE: { PAYMENT_METHODS: activeCache } } = MEM_CACHE

  let paymentMethodsData = {}
  let activeCacheMap
  try {
    activeCacheMap = getFromMainCache(activeCache)
    // console.log('PAYMENT_METHODS **//*** activeCacheMap 1 --->>>\n', activeCacheMap)
    const isCacheToClear = mainCache.get(`STALE_DATA_${activeCache}`)
    if (isCacheToClear) deleteKeyFromMainCache(activeCache)

    if (!activeCacheMap || !activeCacheMap.size) {
      const databasePaymentMethodsRef = await firestoreDatabaseAdmin.collection(PAYMENT_METHODS).get()
      console.log('Getting INITIAL PAYMENT_METHODS')
      databasePaymentMethodsRef.docs.forEach(doc => {
        const databasePaymentMethods = doc.data()
        paymentMethodsData = {
          ...databasePaymentMethods
        }
      })

      const parsedPaymentMethods = JSON.parse(paymentMethodsData.paymentMethods)
      const completePaymentMethods = Promise.all(parsedPaymentMethods.map(async method => {
        if (!method?.imageID) return method
        const { imageID, cbu_or_link: imageURL } = method
        const image = imageID ? (await getBucketImageURL(imageID) || imageURL) : (imageURL || null)
        return {
          ...method,
          image
        }
      }))
      const paymentMethodsToCache = await completePaymentMethods
      activeCacheMap.set(PAYMENT_METHODS, JSON.stringify(paymentMethodsToCache))
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
      // console.log('PAYMENT_METHODS **//***  activeCacheMap 2 --->>>\n', activeCacheMap)
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
