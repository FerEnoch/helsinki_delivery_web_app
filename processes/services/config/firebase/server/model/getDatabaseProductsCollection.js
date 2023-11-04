import { FIREBASE_DATABASES } from '../../databases'
import { firestoreDatabaseAdmin } from '../config'

export async function getDatabaseProductsCollection () {
  const { PRODUCTS } = FIREBASE_DATABASES
  const databaseProdsRef = await firestoreDatabaseAdmin.collection(PRODUCTS).get()
  console.log(`Getting INITIAL STALE ${databaseProdsRef.docs.length} products`)

  const products = []
  databaseProdsRef.docs.forEach(doc => {
    const product = doc.data()
    products.push({ ...product })
  })
  return products
}
