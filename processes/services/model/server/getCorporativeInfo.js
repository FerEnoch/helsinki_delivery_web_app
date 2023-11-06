import { FIREBASE_DATABASES } from '../../config/firebase/databases'
import { getInfoFromCacheOrFirestore } from '../../config/firebase/server/model/getInfoFromCacheOrFirestore'
import { getPaymentMethodsFromCacheOrFirestore } from '../../config/firebase/server/model/getPaymentMethodsFromCacheOrFirestore'

export async function getCorporativeInfo (reqData) {
  const { INFO, PAYMENT_METHODS } = FIREBASE_DATABASES
  if (reqData === INFO) {
    const corporativeInfo = (await getInfoFromCacheOrFirestore()).flat()
    console.log(`
    INFO --> ${corporativeInfo.length}`)
    return [...corporativeInfo]
  }
  if (reqData === PAYMENT_METHODS) {
    const paymentMethods = (await getPaymentMethodsFromCacheOrFirestore()).flat(2)
    console.log(`
    PAYMENT_METHODS --> ${paymentMethods.length}
    `)
    return [...paymentMethods]
  }

  throw new Error(`COULD NOT FIND required database -> ${reqData}`)
}
