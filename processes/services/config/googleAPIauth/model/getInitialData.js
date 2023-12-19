// import { ApplicationSpreadSheetID, SHEETS_NAMES } from '@/processes/services/googleAPIauth/config/spreadsheet'
// import 'server-only'

// export async function getInitialData (sheetsService) {
//   try {
//     // sheetsService.spreadsheets.values.get - clear - append
//     const { data } = await sheetsService.spreadsheets.values.get({
//       spreadsheetId: ApplicationSpreadSheetID,
//       range: SHEETS_NAMES.CACHE_SHEET,
//       valueRenderOption: 'FORMATTED_VALUE'
//     })
//     console.log(`${data.values ? data.values.length : 0} rows retrieved from drive cache sheet.`)
//     if (data.values) return ({ message: 'OK', content: [...data.values] })
//   } catch (error) {
//     console.table(
//       {
//         message: '\'Failed to get initial data from CACHE SHEET */*********** ***************//-->',
//         error: error.message
//       }
//     )
//     throw error
//   }
// }
