import { Readable } from 'node:stream'
import 'server-only'
import { authenticate } from '../config/googleDriveClient'
import { GOOGLE_API_SERVICES } from '../config/services'
import { InvoicesFolderID } from '../config/spreadsheet'

export async function uploadFile ({ receipt: file, receiptName }) {
  const fileMetadata = {
    name: receiptName,
    parents: [InvoicesFolderID]
  }
  const fileStream = await file.stream()

  const fileMedia = {
    body: Readable.from(fileStream),
    mimeType: file.type
  }

  try {
    const driveService = authenticate(GOOGLE_API_SERVICES.googe_drive)
    const response = await driveService.files.create({
      resource: fileMetadata,
      media: fileMedia
    })

    if (response.data) {
      return { message: 'OK' }
    }
  } catch (e) {
    console.error(e.message)
  }
}
