'use client'
import classes from './PaymentMethod.module.css'

import Image from 'next/image'

export default function PaymentMethod ({ paymentMethods }) {
  return (
    <main className={classes.image_container}>
      <Image
        width={100}
        height={100}
        alt='altText'
        src='src'
        onError={() => {}}
      />
      <h1>A PAGAR</h1>
    </main>
  )
}
