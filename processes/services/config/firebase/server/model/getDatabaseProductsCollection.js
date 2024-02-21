import { FIREBASE_DATABASES } from '../../databases'
import { firestoreDatabaseAdmin } from '../config'

export async function getDatabaseCategoriesCollection () {
  const { PRODUCT_CATEGORIES, PRODUCT_COMBOS } = FIREBASE_DATABASES
  const [prodsRef, combosRef] = await Promise.all(
    [PRODUCT_CATEGORIES, PRODUCT_COMBOS].map(collection => firestoreDatabaseAdmin.collection(collection).get())
  )
  console.log(`Getting INITIAL STALE ${prodsRef.docs.length} categories / ${combosRef.docs.length} combos`)

  return prodsRef.docs.concat(combosRef.docs).map(doc => {
    const firestoreDocInfo = doc.data()
    const [firestoreID, categoryData] = Object.entries(firestoreDocInfo).flat()
    return { firestoreID, categoryData }
  })
}
