import { firestoreDatabaseAdmin } from '../config'

export async function getDatabaseProductsCollection () {
  const databaseProdsRef = await firestoreDatabaseAdmin.collection('products').get()
  console.log(`Getting INITIAL STALE ${databaseProdsRef.docs.length} products`)

  const products = []
  databaseProdsRef.docs.forEach(doc => {
    const product = doc.data()
    products.push({ ...product })
  })
  return products
}
