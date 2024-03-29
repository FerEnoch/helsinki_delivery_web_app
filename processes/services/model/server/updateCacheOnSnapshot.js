import { deleteKeyFromMainCache, getFromMainCache } from '@/processes/cache'
import { MEM_CACHE } from '@/processes/cache/config'
import { revalidatePath } from 'next/cache'
import { getPaymentMethodsCollection } from '../../config/firebase/server/model/getPaymentMethodsCollection'
import { getFirebaseCollection } from '../../config/firebase/server/model/getFirebaseCollection'
import { FIREBASE_DATABASES } from '../../config/firebase/databases'
import { populateCategoriesCache } from './populateCategoriesCache'

async function revalidateCacheCategories (key) {
  deleteKeyFromMainCache(key)
  await populateCategoriesCache()
  return true
}

async function revalidateInfoCache (content) {
  const { FIREBASE_CACHE: { INFO: activeCache } } = MEM_CACHE
  console.log(`UPDATING ${content}`)
  const activeCacheMap = getFromMainCache(activeCache)
  const { INFO } = FIREBASE_DATABASES
  const [{ info }] = await getFirebaseCollection(INFO)
  activeCacheMap.set(activeCache, info)
  /* Creating cache loggin */
  console.log(`
  CACHE POPULATED/**** data from **> ${activeCache}
  **>`)
  return true
}

async function revalidateFaqCache (content) {
  const { FIREBASE_CACHE: { FAQ: activeCache } } = MEM_CACHE
  console.log(`UPDATING ${content}`)
  const activeCacheMap = getFromMainCache(activeCache)
  const { FAQ } = FIREBASE_DATABASES
  const [{ faq }] = await getFirebaseCollection(FAQ)
  activeCacheMap.set(activeCache, faq)
  /* Creating cache loggin */
  console.log(`
  CACHE POPULATED/**** data from **> ${activeCache}
  **>`)
  return true
}

async function revalidatePaymentMethodsCache (content) {
  const { FIREBASE_CACHE: { PAYMENT_METHODS: activeCache } } = MEM_CACHE
  console.log(`UPDATING ${content}`)
  const activeCacheMap = getFromMainCache(activeCache)

  const paymentMethodsToCache = await getPaymentMethodsCollection()
  activeCacheMap.set(activeCache, JSON.stringify(paymentMethodsToCache))
  /* Creating cache loggin */
  console.log(`
  CACHE POPULATED/**** data from **> ${activeCache} 
  **> ${paymentMethodsToCache.length} payment methods`)
  return true
}

const { FIREBASE_CACHE: { INFO, FAQ, PAYMENT_METHODS, PRODUCTS } } = MEM_CACHE
const DATABASE_UPDATE_ACTIONS = {
  [PRODUCTS]: {
    REVALIDATE: revalidateCacheCategories
  },
  [INFO]: {
    UPDATE: revalidateInfoCache
  },
  [FAQ]: {
    UPDATE: revalidateFaqCache
  },
  [PAYMENT_METHODS]: {
    UPDATE: revalidatePaymentMethodsCache
  }
}

export async function updateCacheOnSnapshot ({ cache, action, content }) {
  /** DO NOT USE -> if (content.length === 0) return    */
  const updateOperationResult = await DATABASE_UPDATE_ACTIONS[cache][action](content)

  if (!updateOperationResult) {
    return {
      message: `Cache COULD NOT ${action}`,
      code: 500
    }
  }
  revalidatePath('/', 'layout')

  return {
    message: 'Success',
    code: 200
  }
}
