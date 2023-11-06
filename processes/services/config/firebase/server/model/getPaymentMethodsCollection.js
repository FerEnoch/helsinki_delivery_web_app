import { FIREBASE_DATABASES } from '../../databases'
import { firestoreDatabaseAdmin } from '../config'
import { getBucketImageURL } from './getBucketImageURL'

export async function getPaymentMethodsCollection () {
  const { PAYMENT_METHODS } = FIREBASE_DATABASES
  let paymentMethodsData
  const databasePaymentMethodsRef = await firestoreDatabaseAdmin.collection(PAYMENT_METHODS).get()
  console.log('Getting INITIAL PAYMENT_METHODS')
  databasePaymentMethodsRef.docs.forEach(doc => {
    const databasePaymentMethods = doc.data()
    paymentMethodsData = {
      ...databasePaymentMethods
    }
  })

  const parsedPaymentMethods = JSON.parse(paymentMethodsData.paymentMethods)

  return Promise.all(parsedPaymentMethods.map(async method => {
    if (!method?.imageID) return method
    const { imageID, cbu_or_link: imageURL } = method
    const image = imageID ? (await getBucketImageURL(imageID) || imageURL) : (imageURL || null)
    return {
      ...method,
      image
    }
  }))
}
