import { bucket } from '../config'
const { getDownloadURL } = require('firebase-admin/storage')

export async function getBucketImageURL (imageId) {
  try {
    const fileRef = bucket.file(`images/${imageId}`)
    return await getDownloadURL(fileRef)
  } catch (e) {
    console.error(`Something happened when trying to get firebase URL for the image ID ${imageId}--> message ${e.message}`)
    console.table(e)
    return null
  }
}
