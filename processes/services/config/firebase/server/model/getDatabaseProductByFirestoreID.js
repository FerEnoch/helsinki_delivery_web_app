import { FIREBASE_DATABASES } from '../../databases'
import { firestoreDatabaseAdmin } from '../config'

export async function getDatabaseProductByFirestoreID (firestoreID) {
  const { PRODUCTS } = FIREBASE_DATABASES
  const docRef = firestoreDatabaseAdmin.collection(PRODUCTS).doc(firestoreID)
  const docSnapshot = await docRef.get()

  if (docSnapshot.exists) {
    return docSnapshot.data()
  } else {
    console.log(`No documents found in firestore with ID ${firestoreID}`)
  }
}
