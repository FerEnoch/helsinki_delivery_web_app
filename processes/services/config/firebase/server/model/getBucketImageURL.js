import { bucket } from '../config'
const { getDownloadURL } = require('firebase-admin/storage')

export async function getBucketImageURL (imageId) {
  try {
    const fileRef = bucket.file(`products_images/${imageId}`)
    return await getDownloadURL(fileRef)
  } catch (e) {
    console.error(`Something happened with imagen ID ${imageId}--> message ${e.message}`)
    console.table(e)
    return null
  }
}
