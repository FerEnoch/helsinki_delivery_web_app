'use client'
import classes from './PaymentMethod.module.css'
import QRServiceOption from '@/features/pay/QRServiceOption'
import TransferenceData from './TransferenceData'
import { useShowPaymentMethod } from '../model/useShowPaymentMethod'

export default function PaymentMethod ({ allPaymentMethods }) {
  const { chosenQR, servicesQR, chosenTransference } = useShowPaymentMethod(allPaymentMethods)

  return (
    <main className={classes.image_container}>
      {
        chosenQR
          ? servicesQR && (
            <QRServiceOption services={servicesQR} />
          )
          : chosenTransference && (
            <TransferenceData transferenceData={chosenTransference} />
          )
      }
    </main>
  )
}
