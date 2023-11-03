import { FIREBASE_DATABASES } from '../../config/firebase/databases'
import { firestoreDatabaseAdmin } from '../../config/firebase/server/config'

const { INFO, PAYMENT_METHODS } = FIREBASE_DATABASES

export async function getAppInfo () {
  try {
    const databaseInfoRef = await firestoreDatabaseAdmin.collection(INFO).get()
    const databasePaymentMethodsRef = await firestoreDatabaseAdmin.collection(PAYMENT_METHODS).get()
    console.log('Getting INITIAL INFO and PAYMENT METHODS')

    let corporativeInfo = {}
    databaseInfoRef.docs.forEach(doc => {
      const databaseInfo = doc.data()
      corporativeInfo = {
        ...databaseInfo
      }
    })
    databasePaymentMethodsRef.docs.forEach(doc => {
      const databasePaymentMethods = doc.data()
      corporativeInfo = {
        ...corporativeInfo,
        ...databasePaymentMethods
      }
    })
    console.log(corporativeInfo)
    console.log(corporativeInfo.info)
    console.log(corporativeInfo.paymentMethods)

    return corporativeInfo
  } catch (error) {
    console.error(`
    Application unabled to compile corporative information...
    No info were found in firebase
    `)
    throw new Error(
      `FAILED TO GET INITIAL DATA */** ${error.message} `,
      { cause: `Impossible firebase connection due to => ${error.cause}` }
    )
  }
}
