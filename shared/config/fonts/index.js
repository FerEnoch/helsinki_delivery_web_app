/* eslint-disable-next-line */
import { Unica_One, Poppins } from 'next/font/google'

export const unicaOne = Unica_One({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  fallback: ['poppins', 'system-ui', 'arial']
  // variable: '--font-unica',
})

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '300'],
  display: 'swap',
  fallback: ['system-ui', 'arial']
  // variable: '--font-poppins'
})
