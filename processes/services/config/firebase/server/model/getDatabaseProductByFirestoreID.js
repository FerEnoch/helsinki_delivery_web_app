import { firestoreDatabaseAdmin } from '../config'

export async function getDatabaseProductByFirestoreID (firestoreID) {
  const docRef = firestoreDatabaseAdmin.collection('products').doc(firestoreID)
  const docSnapshot = await docRef.get()

  if (docSnapshot.exists) {
    // console.log('Document data:', docSnapshot.data())
    return docSnapshot.data()
  } else {
    console.log(`No documents found in firestore with ID ${firestoreID}`)
  }
}
