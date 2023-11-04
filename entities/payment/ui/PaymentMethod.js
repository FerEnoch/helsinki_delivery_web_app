'use client'
import classes from './PaymentMethod.module.css'
import QRServiceOption from '@/features/pay/QRServiceOption'
import TransferenceData from './TransferenceData'
import { useShowPaymentMethod } from '../model/useShowPaymentMethod'
import PaymentsServiceFooter from './PaymentServiceFooter'

export default function PaymentMethod ({ allPaymentMethods }) {
  const { chosenQR, servicesQR, chosenTransference, kindOfService } = useShowPaymentMethod(allPaymentMethods)

  return (
    <main className={classes.method_container}>
      {
        chosenQR
          ? servicesQR && (
            <QRServiceOption services={servicesQR} />
          )
          : chosenTransference && (
            <TransferenceData transferenceData={chosenTransference} />
          )
      }
      <PaymentsServiceFooter kindOfService={kindOfService} />
    </main>
  )
}
