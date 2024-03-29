import { getBucketImageURL } from '@/processes/services/config/firebase/server/model/getBucketImageURL'
import { genericCacheTTLInMin } from './config'
import MemoryUsage from '../lib/MemoryUsage'

MemoryUsage()

export const mainCache = new Map()
const cacheTTL = 1000 * 60 * genericCacheTTLInMin
let deleteCacheTimeout
/**
 * If there isn't a cache Map with the provided key, It is created.
 * Time-To-Live (in minutes), provided or not, will add a STALE key to the Map after
 * a certain period of time, but it won't delete the data. That's what the deleteKeyFromMainCache
 * function is for. If not provided, TTL will be determined by the genericCacheTTLInMin
 * const in cache/config
 *
 * @param {String} key Cache name. From where data is comming
 * @param {Number} TTLInMinutes Time in minutes after which cache data will became STALE, but is not deleted authomaticaly
 * @returns {Map} The required cached data: {Map}
 */
export function getFromMainCache (key, TTLInMinutes) {
  if (!key) return
  if (!mainCache.has(key)) {
    console.log('Creando cache -->', key)
    mainCache.set(key, new Map())
    mainCache.set(`STALE_DATA_${key}`, false)

    if (deleteCacheTimeout) clearTimeout(deleteCacheTimeout)
    deleteCacheTimeout = setTimeout(() => {
      if (mainCache.has(`STALE_DATA_${key}`)) {
        mainCache.set(`STALE_DATA_${key}`, true)
      }
    }, TTLInMinutes ? (1000 * 60 * TTLInMinutes) : cacheTTL)

    /** Loggin message */
    console.log(`
    Setting cache validity in 
    ${(TTLInMinutes && `${TTLInMinutes} minutes`) || (
      genericCacheTTLInMin === 1440
        ? '24hs\n'
        : `${genericCacheTTLInMin} minutes`
        )
      }`)
  }
  return mainCache.get(key)
}

export function deleteKeyFromMainCache (key) {
  if (!key) return
  mainCache.delete(key)

  // const isCacheToClear = mainCache.get(`STALE_DATA_${key}`)
  // if (!isCacheToClear) return
  // mainCache.delete(key)
  if (deleteCacheTimeout) clearTimeout(deleteCacheTimeout)

  console.log(`
    ****************//****** 
    Deleting stale data for ${key}
    DELETING CACHE!
      `)
}

export async function setProdInFirebaseCache ({ category, products }, activeCache) {
  const databaseCache = getFromMainCache(activeCache)
  console.log(`...adding category ${category} --> ${products?.length} products`)

  const productsToChache = Promise.all(products.map(async (prod) => {
    const { imageID, imageURL, name, category, type, isCombo, ...restProductFields } = prod
    const firestoreURL = imageID && await getBucketImageURL(imageID)
    const image = firestoreURL || (imageURL || null)

    const description = isCombo && (
      prod?.products.join(' - ')
    )

    return {
      name: String(name),
      category: String(category),
      type: String(type),
      image,
      quantity: 0,
      description,
      isCombo,
      ...restProductFields
    }
  }))

  databaseCache.set(
    category,
    JSON.stringify(
      await productsToChache
    ))
}

/** old cache api

export async function setProdInFirebaseCache ({ category, products }, activeCache) {
  const databaseCache = getFromMainCache(activeCache)
  console.log(`...adding category ${category} --> ${products?.length} products`)

  const buildedProducts = products.map(product => {
    const { name, type, category, ...restProductFields } = product
    return {
      name: String(name),
      category: String(category),
      type: String(type),
      quantity: 0,
      ...restProductFields
    }
  })

  const prodsWithImg = Promise.all(buildedProducts.map(async prod => {
    const { imageID, imageURL } = prod
    const image = imageID ? (await getBucketImageURL(imageID) || imageURL) : (imageURL || null)
    return {
      ...prod,
      image
    }
  }))

  // add products inmediately in order to SSR to show all categories without delay
  databaseCache.set(
    category,
    JSON.stringify(
      [...buildedProducts]
    ))

  // add products with img src promise resolved
  prodsWithImg.then((prods) => {
    databaseCache.set(
      category,
      JSON.stringify(
        [...prods]
      ))
  })
}

 */
