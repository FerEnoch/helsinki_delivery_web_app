import { deleteKeyFromMainCache, getFromMainCache, mainCache } from '@/processes/cache'
import { FIREBASE_DATABASES } from '../../databases'
import { firestoreDatabaseAdmin } from '../config'
import { MEM_CACHE } from '@/processes/cache/config'

export async function getInfoCollection () {
  const { INFO } = FIREBASE_DATABASES
  const { FIREBASE_DATABASE: { INFO: activeCache } } = MEM_CACHE

  let infoCollectionData = {}
  let activeCacheMap
  try {
    activeCacheMap = getFromMainCache(activeCache)
    // console.log('INFO **//***  activeCacheMap 1 --->>>\n', activeCacheMap)
    const isCacheToClear = mainCache.get(`STALE_DATA_${activeCache}`)
    if (isCacheToClear) deleteKeyFromMainCache(activeCache)

    if (!activeCacheMap || !activeCacheMap.size) {
      const databaseInfoRef = await firestoreDatabaseAdmin.collection(INFO).get()
      console.log('Getting INITIAL INFO')
      databaseInfoRef.docs.forEach(doc => {
        const databaseInfo = doc.data()
        infoCollectionData = {
          ...databaseInfo
        }
      })

      activeCacheMap.set(INFO, infoCollectionData.info)
      /* Creating cache loggin */
      console.log(`
      CACHE POPULATED/**** data from **> ${activeCache}
      **>`)
      return [JSON.parse(infoCollectionData.info)]
    }

    activeCacheMap = getFromMainCache(activeCache)
    if (activeCacheMap.size > 0) {
      /* Returning from cache loggin */
      console.log(`
      Returning ****/CACHE/**** data from **> ${activeCache}
      `)
      // console.log('INFO **//***  activeCacheMap 2 --->>>\n', activeCacheMap)
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
