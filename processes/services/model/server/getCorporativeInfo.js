import { FIREBASE_DATABASES } from '../../config/firebase/databases'
import { getInfoCollection } from '../../config/firebase/server/model/getInfoCollection'
import { getPaymentMethodsCollection } from '../../config/firebase/server/model/getPaymentMethodsCollection'

export async function getCorporativeInfo (reqData) {
  const { INFO, PAYMENT_METHODS } = FIREBASE_DATABASES
  const [corporativeInfo, paymentMethods] = (await Promise.all([getInfoCollection(), getPaymentMethodsCollection()])).flat()
  console.log('*******/ \n\nCORPORATIVE INFO : \n')
  console.log('corporativeInfo ***/***\n', corporativeInfo)
  console.log('paymentMethods ***/***\n', paymentMethods.flat())
  if (reqData === INFO) return corporativeInfo
  if (reqData === PAYMENT_METHODS) return paymentMethods.flat()
  throw new Error(`Sorry, COULD NOT find required database -> ${reqData}`)
}
