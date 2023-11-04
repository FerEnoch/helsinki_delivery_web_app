import { deleteProdInFirebaseCache, setProdInFirebaseCache } from '@/processes/cache'
import { getDatabaseProductByFirestoreID } from '../../config/firebase/server/model/getDatabaseProductByFirestoreID'
import { MEM_CACHE } from '@/processes/cache/config'
import { getDatabaseProdByProdID } from '../../config/firebase/server/model/getDatabaseProdByProdID'
import { revalidatePath } from 'next/cache'

export async function addCacheProduct (productsIDs) {
  const { FIREBASE_DATABASE: { PRODUCTS } } = MEM_CACHE

  const result = new Set()
  productsIDs.forEach(async productID => {
    const productFromFirestore = await getDatabaseProdByProdID(productID)
    console.log('ADDING PRODUCT to cache --->', productFromFirestore?.id)
    const operationResult = await setProdInFirebaseCache(productFromFirestore, PRODUCTS)
    if (!operationResult) {
      result.add('failure')
      console.log(`failed operation __ --_  NOT adding ${productID} product...`)
    }
  })
  return !result.has('failure')
}

export async function updateCacheProduct (firestoreIDs) {
  const { FIREBASE_DATABASE: { PRODUCTS } } = MEM_CACHE

  const result = new Set()
  firestoreIDs.forEach(async firestoreID => {
    const updatedFirestoreProduct = await getDatabaseProductByFirestoreID(firestoreID)
    if (!updatedFirestoreProduct) {
      console.log(`Something happened updating ${firestoreID} product... :(`)
      return
    }
    console.log('UPDATING PRODUCT from cache --->', updatedFirestoreProduct?.id)
    const operationResult = await setProdInFirebaseCache(updatedFirestoreProduct, PRODUCTS)
    if (!operationResult) {
      result.add('failure')
      console.log(`failed operation __ --_  NOT updating ${firestoreID} product...`)
    }
  })
  return !result.has('failure')
}

export async function deleteCacheProduct (productIDs) {
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

const UPDATE_CACHE_ACTIONS = {
  ADD: addCacheProduct,
  UPDATE: updateCacheProduct,
  DELETE: deleteCacheProduct
}

export async function updateCacheOnSnapshot ({ action, content }) {
  /** DO NOT USE -> if (content.length === 0) return    */
  const updateOperationResult = await UPDATE_CACHE_ACTIONS[action](content)

  if (!updateOperationResult) {
    return {
      message: `Cache COULD NOT ${action}`,
      code: 500
    }
  }
  revalidatePath('/')
  return {
    message: 'Success',
    code: 200
  }
}
