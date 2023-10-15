import { buildOrderData } from '@/features/formFill/lib/buildOrderData'
import { uploadFile } from '@/processes/services/config/googleAPIauth/model/uploadFile'
import { writeOrderInSheets } from '@/processes/services/config/googleAPIauth/model/writeOrder'
import { NextResponse } from 'next/server'

export async function POST (request) {
  const incomingOrder = await request.formData()

  try {
    const [orderDataToSheets, receipt] = buildOrderData(incomingOrder)

    const { message: sheetsResponseMessage } = await writeOrderInSheets(Object.values(orderDataToSheets))
    const { message: fileUploadResponseMessage } = receipt ? await uploadFile(receipt) : { message: 'No receipt delivered' }

    const operationSuccess = receipt
      ? fileUploadResponseMessage === 'OK' && sheetsResponseMessage === 'OK'
      : sheetsResponseMessage === 'OK'

    return NextResponse.json(
      { message: operationSuccess ? 'success' : 'Could not send order!' },
      { status: operationSuccess ? 200 : 500 }
    )
  } catch (e) {
    console.error('error to send order //>>>>>>>>', e)
    return NextResponse.json(
      { message: 'fail to send order!' },
      { status: 500 }
    )
  }
}
