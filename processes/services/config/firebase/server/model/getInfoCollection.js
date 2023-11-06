import { FIREBASE_DATABASES } from '../../databases'
import { firestoreDatabaseAdmin } from '../config'

export async function getInfoCollection () {
  const { INFO } = FIREBASE_DATABASES

  console.log('Getting INITIAL INFO')
  const databaseInfoRef = await firestoreDatabaseAdmin.collection(INFO).get()
  return databaseInfoRef.docs.map(doc => doc.data())
}
