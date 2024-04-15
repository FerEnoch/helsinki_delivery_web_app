import { deleteKeyFromMainCache, getFromMainCache, mainCache } from '@/processes/cache'
import { MEM_CACHE } from '@/processes/cache/config'
import { FIREBASE_DATABASES } from '@/processes/services/config/firebase/databases'
import { getFirebaseCollection } from '@/processes/services/config/firebase/server/model/getFirebaseCollection'

export async function getBusinessHours () {
  // mock api -> return finalBusinessGrid
  // if (finalBusinessGrid) return finalBusinessGrid
  /* end mock api */

  const { FIREBASE_CACHE: { BUSINESS_HOURS: activeCache } } = MEM_CACHE

  let activeCacheMap
  try {
    activeCacheMap = getFromMainCache(activeCache)
    const isCacheToClear = mainCache.get(`STALE_DATA_${activeCache}`)
    if (isCacheToClear) deleteKeyFromMainCache(activeCache)

    if (!activeCacheMap || !activeCacheMap.size) {
      const { BUSINESS_HOURS } = FIREBASE_DATABASES
      const [businessHours] = await getFirebaseCollection(BUSINESS_HOURS)
      /**
      console.log(businessHours)
      {
        hoursTest: '{"deliveryCost":750,"openToOrders":10,"businessHours":{"delivery":{"normalNight":{"from":20,"to":0.15},"extendedNight":{"from":20,"to":1.45}},"takeAway":{"earlyAfternoon":{"from":15,"to":17},"normalNight":{"from":20,"to":0.15},"extendedNight":{"from":20,"to":1.45}}},"grid":[{"day":"monday","delivery":"Cerrado","takeAway":"Cerrado"},{"day":"tuesday","delivery":"Cerrado","takeAway":"Cerrado"},{"day":"wednesday","delivery":"Horario normal","takeAway":"Noche normal"},{"day":"thursday","delivery":"Horario normal","takeAway":"Noche normal"},{"day":"friday","delivery":"Horario extendido","takeAway":"Noche extendido"},{"day":"saturday","delivery":"Horario extendido","takeAway":"Siesta y noche extendido"},{"day":"sunday","delivery":"Cerrado","takeAway":"Cerrado"}]}'
      }
      */
      activeCacheMap.set(activeCache, businessHours[BUSINESS_HOURS])
      /* Creating cache loggin */
      console.log(`
      CACHE POPULATED/**** data from **> ${activeCache}
      **>`)

      return JSON.parse(businessHours[BUSINESS_HOURS])
    }

    activeCacheMap = getFromMainCache(activeCache)
    if (activeCacheMap.size > 0) {
      /* Returning from cache loggin */
      console.log(`
      Returning ****/CACHE/**** data from **> ${activeCache}
      `)

      return JSON.parse(activeCacheMap.get(activeCache))
    } else {
      /** retry... */
      activeCacheMap = getFromMainCache(activeCache)
      return JSON.parse(activeCacheMap.get(activeCache))
    }
  } catch (error) {
    console.error(`
    Application unabled to compile business hours collection...
    No business hours info were found in firebase
    `)
    throw new Error(
      `FAILED TO GET INITIAL DATA */** ${error.message} `,
      { cause: `Impossible firebase connection due to => ${error.cause}` }
    )
  }
}
