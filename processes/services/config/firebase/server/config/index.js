import { serviceAccount } from './admin-sdk.js'
const { initializeApp, cert, getApps } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getStorage } = require('firebase-admin/storage')

const apps = getApps()
const firestoreAdmin = !apps.length && initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.FIREBASE_CONFIG_CLIENT_STORAGEBUCKET
})

export const firestoreDatabaseAdmin = getFirestore(firestoreAdmin)
export const bucket = getStorage().bucket()
