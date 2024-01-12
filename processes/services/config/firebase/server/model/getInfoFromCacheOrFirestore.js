import { deleteKeyFromMainCache, getFromMainCache, mainCache } from '@/processes/cache'
import { MEM_CACHE } from '@/processes/cache/config'
import { getFirebaseCollection } from './getFirebaseCollection'
import { FIREBASE_DATABASES } from '../../databases'

export async function getInfoFromCacheOrFirestore () {
  const { FIREBASE_CACHE: { INFO: activeCache } } = MEM_CACHE

  let activeCacheMap
  try {
    activeCacheMap = getFromMainCache(activeCache)
    const isCacheToClear = mainCache.get(`STALE_DATA_${activeCache}`)
    if (isCacheToClear) deleteKeyFromMainCache(activeCache)

    if (!activeCacheMap || !activeCacheMap.size) {
      const { INFO } = FIREBASE_DATABASES
      const [{ info }] = await getFirebaseCollection(INFO)
      activeCacheMap.set(activeCache, info)
      /* Creating cache loggin */
      console.log(`
      CACHE POPULATED/**** data from **> ${activeCache}
      **>`)
      return [JSON.parse(info)]
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
    Application unabled to compile info collection...
    No info were found in firebase
    `)
    throw new Error(
      `FAILED TO GET INITIAL DATA */** ${error.message} `,
      { cause: `Impossible firebase connection due to => ${error.cause}` }
    )
  }
}
