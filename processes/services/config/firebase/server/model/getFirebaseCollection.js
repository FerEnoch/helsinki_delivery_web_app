import { firestoreDatabaseAdmin } from '../config'

export async function getFirebaseCollection (collection) {
  console.log(`Getting INITIAL ${collection}`)
  const databaseInfoRef = await firestoreDatabaseAdmin.collection(collection).get()
  return databaseInfoRef.docs.map(doc => doc.data())
}
