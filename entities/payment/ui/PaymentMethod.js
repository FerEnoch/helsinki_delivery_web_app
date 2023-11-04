'use client'
import { useAppStore } from '@/entities/lib/store'
import classes from './PaymentMethod.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function PaymentMethod ({ allPaymentMethods }) {
  const { paymentMethod } = useAppStore()
  const [chosenMethodData, setChosenMethodData] = useState(null)

  useEffect(() => {
    if (paymentMethod.label.includes('QR')) {
      const [methodToRender] = allPaymentMethods.filter(method => method.payment_method.includes('QR'))
      setChosenMethodData(methodToRender)
    } else {
      const [methodToRender] = allPaymentMethods.filter(method => method.payment_method.includes('Transferencia'))
      setChosenMethodData(methodToRender)
    }
  }, [])

  return (
    <main className={classes.image_container}>
      <Image
        width={100}
        height={100}
        alt={chosenMethodData?.payment_method}
        src={chosenMethodData?.image}
        onError={() => {}}
      />
      <h1>A PAGAR</h1>
    </main>
  )
}
