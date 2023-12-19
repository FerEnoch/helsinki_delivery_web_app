// import { clientApp } from '../../config/firebase/client/config'
// import { collection, query, onSnapshot, orderBy, getFirestore } from 'firebase/firestore'

// export function getDatabaseSnapshot (updateStockProdsStore) {
//   const clientAppFirestore = getFirestore(clientApp)
//   const productsCollectionRef = collection(clientAppFirestore, 'products')
//   const q = query(productsCollectionRef, orderBy('id', 'asc'))

//   return onSnapshot(q, snapshot => {
//     snapshot.docChanges().forEach(change => {
//       const product = change.doc.data()
//       console.log([product, change.type])
//     })
//     return updateStockProdsStore([...snapshot.docChanges()])
//   })
// }
