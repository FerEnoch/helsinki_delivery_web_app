import { OrdersSpreadSheetID } from '@/processes/services/googleAPIauth/config/spreadsheet'
import { sheets } from '../processes/services/googleAPIauth/googleDriveClient'
import 'server-only'

export async function writeOrder ({ timestamp, id, order, payment }) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: OrdersSpreadSheetID,
      range: 'A2:C1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, order, payment, id]]
      }
    })
    if (response.data.spreadsheetId) {
      return { message: 'OK' }
    }
  } catch (e) {
    console.error(e.message)
  }
}
