import { FIREBASE_DATABASES } from '../../databases'
import { firestoreDatabaseAdmin } from '../config'

export async function getDatabaseProductsCollection () {
  const { PRODUCTS, PRODUCT_CATEGORIES } = FIREBASE_DATABASES
  const databaseProdsRef = await firestoreDatabaseAdmin.collection(PRODUCT_CATEGORIES).get()
  console.log(`Getting INITIAL STALE ${databaseProdsRef.docs.length} categories`)

  const products = []
  databaseProdsRef.docs.forEach(doc => {
    const firestoreDocInfo = doc.data()
    const categoryData = Object.values(firestoreDocInfo)
    JSON.parse(categoryData).forEach(product => products.push({ ...product }))
  })
  return [...products]
}
