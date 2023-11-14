import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_CONFIG_CLIENT_APIKEY,
  authDomain: process.env.FIREBASE_CONFIG_CLIENT_AUTHDOMAIN,
  projectId: process.env.FIREBASE_CONFIG_CLIENT_PROJECTID,
  storageBucket: process.env.FIREBASE_CONFIG_CLIENT_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_CONFIG_CLIENT_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_CONFIG_CLIENT_APPID
}

// Initialize Firebase
export const clientApp = initializeApp(firebaseConfig)
