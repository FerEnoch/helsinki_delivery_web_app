import localFont from 'next/font/local'
/* eslint-disable-next-line */
import { Unica_One, Poppins } from 'next/font/google'

export const unicaOne = Unica_One({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  fallback: ['poppins', 'helvetica', 'arial'],
  variable: '--font-unica'
})

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '300'],
  display: 'swap',
  fallback: ['helvetica', 'arial']
  // variable: '--font-poppins'
})

export const codecProBold = localFont({
  src: '../../../public/assets/fonts/CodecPro-Bold.woff2',
  display: 'swap',
  fallback: ['poppins', 'helvetica', 'arial'],
  variable: '--font-codec'
})

export const codecProRegular = localFont({
  src: '../../../public/assets/fonts/CodecPro-News.woff2',
  display: 'swap',
  fallback: ['poppins', 'helvetica', 'arial'],
  variable: '--font-codec'
})
