import { FIREBASE_DATABASES } from '../../databases'
import { firestoreDatabaseAdmin } from '../config'

export async function getInfoCollection () {
  const { INFO } = FIREBASE_DATABASES
  let infoCollectionData = {}

  const databaseInfoRef = await firestoreDatabaseAdmin.collection(INFO).get()
  console.log('Getting INITIAL INFO')
  databaseInfoRef.docs.forEach(doc => {
    const databaseInfo = doc.data()
    infoCollectionData = {
      ...databaseInfo
    }
  })
  return infoCollectionData
}
