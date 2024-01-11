import { FIREBASE_DATABASES } from '../../databases'
import { firestoreDatabaseAdmin } from '../config'

export async function getDatabaseCategoriesCollection () {
  const { /* PRODUCTS, */ PRODUCT_CATEGORIES } = FIREBASE_DATABASES
  const databaseProdsRef = await firestoreDatabaseAdmin.collection(PRODUCT_CATEGORIES).get()
  console.log(`Getting INITIAL STALE ${databaseProdsRef.docs.length} categories`)

  return [...databaseProdsRef.docs]
}
