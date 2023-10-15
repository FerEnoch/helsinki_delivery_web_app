import 'server-only'
import { authenticate } from '../config/googleDriveClient'
import { GOOGLE_API_SERVICES } from '../config/services'
import { OrdersSpreadSheetID } from '../config/spreadsheet'

export async function writeOrderInSheets (orderData) {
  console.log(orderData)
  try {
    const sheetsClient = authenticate(GOOGLE_API_SERVICES.googe_sheets)

    const response = await sheetsClient.spreadsheets.values.append({
      spreadsheetId: OrdersSpreadSheetID,
      range: 'A2:Z2',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [orderData] // Has to be a 2-dimentional array
      }
    })
    if (response.data.spreadsheetId) {
      return { message: 'OK' }
    }
  } catch (e) {
    console.log(e.message)
  }
}
