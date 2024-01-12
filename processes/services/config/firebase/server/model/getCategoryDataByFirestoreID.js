import { FIREBASE_DATABASES } from '../../databases'
import { firestoreDatabaseAdmin } from '../config'

export async function getCategoryDataByFirestoreID (firestoreID, database) {
  const { /* PRODUCTS */ PRODUCT_CATEGORIES } = FIREBASE_DATABASES
  const collection = database || PRODUCT_CATEGORIES

  const docRef = firestoreDatabaseAdmin.collection(collection).doc(firestoreID)
  const docSnapshot = await docRef.get()

  if (docSnapshot.exists) {
    return docSnapshot.data()
  } else {
    console.log(`No documents found in firestore with ID ${firestoreID}`)
  }
}
