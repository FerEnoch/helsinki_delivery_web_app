// import { getStorage } from 'firebase-admin/storage'
// import { clientApp } from '../../config/firebase/client/config'

export async function getFileBlob (URL) {
  if (!URL) return
  try {
    // const response = await fetch(URL, { mode: 'no-cors' })
    // console.log(response)
    // const storage = getStorage(clientApp)
    // const fileRef = ref(storage, `images/${imageId}`)
    // return await getDownloadURL(fileRef)
  } catch (e) {
    throw new Error(`COULD NOT GET IMAGE TO SHARE ** ${e.message}`)
  }
}
