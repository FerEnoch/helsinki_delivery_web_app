import { FIREBASE_DATABASES } from '../../config/firebase/databases'
import { getInfoCollection } from '../../config/firebase/server/model/getInfoCollection'
import { getPaymentMethodsCollection } from '../../config/firebase/server/model/getPaymentMethodsCollection'

export async function getCorporativeInfo (reqData) {
  console.log(`
  *******/ GETTING CORPORATIVE INFO -> ${reqData}:\n\n`)
  const { INFO, PAYMENT_METHODS } = FIREBASE_DATABASES
  if (reqData === INFO) {
    const corporativeInfo = (await getInfoCollection()).flat()
    console.log(`
    INFO --> ${corporativeInfo.length}`)
    return [...corporativeInfo]
  }
  if (reqData === PAYMENT_METHODS) {
    const paymentMethods = (await getPaymentMethodsCollection()).flat(2)
    console.log(`
    PAYMENT_METHODS --> ${paymentMethods.length}
    `)
    return [...paymentMethods]
  }

  throw new Error(`COULD NOT FIND required database -> ${reqData}`)
}
