import { FIREBASE_DATABASES } from '../../databases'
import { firestoreDatabaseAdmin } from '../config'
import { getBucketImageURL } from './getBucketImageURL'

export async function getPaymentMethodsCollection () {
  const { PAYMENT_METHODS } = FIREBASE_DATABASES

  console.log('Getting INITIAL PAYMENT_METHODS')
  const databasePaymentMethodsRef = await firestoreDatabaseAdmin.collection(PAYMENT_METHODS).get()
  const [{ paymentMethods }] = databasePaymentMethodsRef.docs.flatMap(doc => doc.data())
  const filteredMethods = JSON.parse(paymentMethods).flatMap(method => {
    return method.filter(m => Boolean(m.cbu_or_link))
  })
  return await Promise.all(filteredMethods.map(async method => {
    if (!method?.imageID) return method
    const { imageID, cbu_or_link: imageURL } = method
    const image = imageID ? (await getBucketImageURL(imageID) || imageURL) : (imageURL || null)
    return {
      ...method,
      image
    }
  }))
}
