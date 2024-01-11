import { deleteProdInFirebaseCache, getFromMainCache, setProdInFirebaseCache } from '@/processes/cache'
import { getDatabaseProductByFirestoreID } from '../../config/firebase/server/model/getDatabaseProductByFirestoreID'
import { MEM_CACHE } from '@/processes/cache/config'
// import { getDatabaseProdByProdID } from '../../config/firebase/server/model/getDatabaseProdByProdID'
import { revalidatePath } from 'next/cache'
import { getPaymentMethodsCollection } from '../../config/firebase/server/model/getPaymentMethodsCollection'
import { getFirebaseCollection } from '../../config/firebase/server/model/getFirebaseCollection'
import { FIREBASE_DATABASES } from '../../config/firebase/databases'

// async function addCacheProduct (productsIDs) {
//   const { FIREBASE_DATABASE: { PRODUCTS } } = MEM_CACHE

//   const result = new Set()
//   productsIDs.forEach(async productID => {
//     const productFromFirestore = await getDatabaseProdByProdID(productID)
//     console.log('ADDING PRODUCT to cache --->', productFromFirestore?.id)
//     const operationResult = await setProdInFirebaseCache(productFromFirestore, PRODUCTS)
//     if (!operationResult) {
//       result.add('failure')
//       console.log(`failed operation __ --_  NOT adding ${productID} product...`)
//     }
//   })
//   return !result.has('failure')
// }

async function updateCacheProduct (firestoreIDs) {
  const { FIREBASE_DATABASE: { PRODUCTS, PRODUCTS_CATEGORIES: CATEGORIES_PRODUCTS } } = MEM_CACHE

  const result = new Set()
  firestoreIDs.forEach(async firestoreID => {
    const updatedCategory = await getDatabaseProductByFirestoreID(firestoreID, CATEGORIES_PRODUCTS)
    if (!updatedCategory) {
      console.log(`Something happened updating ${firestoreID} product... :(`)
      return
    }
    // console.log(updatedCategory)
    /**
     * parse category products
     */
    const [categoryData] = Object.values(updatedCategory)
    const updatedCatProducts = JSON.parse(categoryData).flat()
    updatedCatProducts.forEach(async product => {
      console.log('UPDATING PRODUCT from cache --->', product?.id)
      const operationResult = await setProdInFirebaseCache(product, PRODUCTS)
      if (!operationResult) {
        result.add('failure')
        console.log(`failed operation __ --_  NOT updating ${firestoreID} product...`)
      }
    })
  })
  return !result.has('failure')
}

async function deleteCacheProduct (productIDs) {
  const { FIREBASE_DATABASE: { PRODUCTS } } = MEM_CACHE

  console.log('DELETING PRODUCTS from cache --->', productIDs)
  const result = new Set()
  productIDs.forEach(productID => {
    const operationResult = deleteProdInFirebaseCache(productID, PRODUCTS)
    if (!operationResult) {
      result.add('failure')
      console.log(`failed operation __ --_  Please check again if product ${productID} exists en cache memory...`)
    }
  })
  return !result.has('failure')
}

async function updateInfoCache (content) {
  const { FIREBASE_DATABASE: { INFO: activeCache } } = MEM_CACHE
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

async function updateFaqCache (content) {
  const { FIREBASE_DATABASE: { FAQ: activeCache } } = MEM_CACHE
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

async function updatePaymentMethodsCache (content) {
  const { FIREBASE_DATABASE: { PAYMENT_METHODS: activeCache } } = MEM_CACHE
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

const { FIREBASE_DATABASE: { INFO, FAQ, PAYMENT_METHODS, PRODUCTS } } = MEM_CACHE
const DATABASE_UPDATE_ACTIONS = {
  [PRODUCTS]: {
    // ADD: addCacheProduct, // prox to be deprecated
    UPDATE: updateCacheProduct,
    DELETE: deleteCacheProduct
  },
  [INFO]: {
    UPDATE: updateInfoCache
  },
  [FAQ]: {
    UPDATE: updateFaqCache
  },
  [PAYMENT_METHODS]: {
    UPDATE: updatePaymentMethodsCache
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

  revalidatePath('/')
  revalidatePath('/cart/payments/pay-method')
  return {
    message: 'Success',
    code: 200
  }
}
