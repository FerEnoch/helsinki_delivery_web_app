import { InvoicesFolderID } from '@/processes/services/googleAPIauth/config/spreadsheet'
import { Readable } from 'node:stream'
import { drive } from '../processes/services/googleAPIauth/googleDriveClient'
import 'server-only'

export async function uploadFile (file) {
  const fileMetadata = {
    name: file.name,
    parents: [InvoicesFolderID]
  }
  const fileStream = await file.stream()

  const fileMedia = {
    body: Readable.from(fileStream),
    mimeType: file.type
  }

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media: fileMedia
    })
    console.log(response.data)
    if (response.data) {
      return { message: 'OK' }
    }
  } catch (e) {
    console.error(e.message)
  }
}
