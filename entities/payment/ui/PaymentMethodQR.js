'use client'
import classes from './PaymentMethodQR.module.css'

import { prodGenericImage } from '@/shared/config/prodGenericImage'
import Image from 'next/image'

export default function PaymentMethodQR ({ altText }) {
  return (
    <main className={classes.image_container}>
      <Image
        width={100}
        height={100}
        alt={altText}
        src={prodGenericImage}
        onError={() => {}}
      />
      <h1>A PAGAR</h1>
    </main>
  )
}
