import { firestoreDatabaseAdmin } from '../config'

export async function getDatabaseProdByProdID (productID) {
  const collectionRef = firestoreDatabaseAdmin.collection('products')
  const snapshot = await collectionRef.where('id', '==', productID).get()
  /**
   * If there are two products in firestore with the same productID, only
   * take the first (althought it must not happen)
   */
  if (!snapshot.empty) {
    return snapshot.docs[0].data()
  } else {
    console.log(`No documents found in firestore with ID ${productID}`)
  }
}
