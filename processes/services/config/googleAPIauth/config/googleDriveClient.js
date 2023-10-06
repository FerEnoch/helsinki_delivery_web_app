import { google } from 'googleapis'
import { GOOGLE_API_SERVICES } from '@/processes/services/googleAPIauth/services'
import { googleServiceAccountAuth } from '@/processes/services/googleAPIauth/config/service-account-creds'
import { deleteKeyFromMainCache, getFromMainCache, mainCache } from '@/processes/cache'
import 'server-only'

export function getAPIAuthClient () {
  /** DON'T MAKE THIS A PROMISE */
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_id: googleServiceAccountAuth.client_id,
      client_email: googleServiceAccountAuth.client_email,
      private_key: googleServiceAccountAuth.private_key
    },
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/spreadsheets'
    ]
  })

  if (auth) {
    console.log('running Drive client API AUTH')
    return auth
  } else {
    throw new Error('Impossible to get the Google API authenticated... :(')
  }
}

export function authenticate (service) {
  const serviceCache = getFromMainCache(service)
  if (mainCache.get(`STALE_DATA_${service}`)) deleteKeyFromMainCache(service)

  if (serviceCache.has(service)) {
    console.log(`Returning ${service} CACHED service`)
    return serviceCache.get(service)
  }

  const {
    googe_drive: { drive, version: driveVersion },
    googe_sheets: { sheets, version: sheetsVersion }
  } = GOOGLE_API_SERVICES

  try {
    if (service === drive) {
      console.log('running FIRST TIME Drive client service')
      const drive = google.drive({
        auth: getAPIAuthClient(),
        version: driveVersion
      })
      serviceCache.set(service, drive)
      return drive
    }
    if (service === sheets) {
      console.log('running FIRST TIME Sheets client service')
      const sheets = google.sheets({
        auth: getAPIAuthClient(),
        version: sheetsVersion
      })
      serviceCache.set(service, sheets)
      return sheets
    }
  } catch (error) {
    console.table(
      {
        message: `Could not initialize ${service} client ***************//-->`,
        error: error.message
      }
    )
    throw error
  }
}
