import { FIREBASE_DATABASES } from '../../config/firebase/databases'
import { getFaqFromCacheOrFirestore } from '../../config/firebase/server/model/getFaqFromCacheOrFirestore'
import { getInfoFromCacheOrFirestore } from '../../config/firebase/server/model/getInfoFromCacheOrFirestore'
import { getPaymentMethodsFromCacheOrFirestore } from '../../config/firebase/server/model/getPaymentMethodsFromCacheOrFirestore'

export async function getCorporativeInfo (reqData) {
  const { INFO, FAQ, PAYMENT_METHODS } = FIREBASE_DATABASES

  if (reqData === INFO) {
    const corporativeInfo = (await getInfoFromCacheOrFirestore()).flat()
    console.log(`
    INFO --> ${corporativeInfo.length}`)
    return [...corporativeInfo]
  }
  if (reqData === FAQ) {
    const faqInfo = (await getFaqFromCacheOrFirestore()).flat()
    console.log(`
    INFO --> ${faqInfo.length}`)
    return [...faqInfo]
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
