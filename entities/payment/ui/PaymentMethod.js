'use client'
import classes from './PaymentMethod.module.css'
import TransferenceOption from './TransferenceOption'
import { useShowPaymentMethod } from '../model/useShowPaymentMethod'
import PaymentsServiceFooter from './PaymentsServiceFooter'
import QRServiceOption from './QRServiceOption'

export default function PaymentMethod ({ allPaymentMethods }) {
  const { chosenQRpaymentData, servicesQR, chosenTransference, kindOfService } = useShowPaymentMethod(allPaymentMethods)

  return (
    <main className={classes.method_container}>
      {
        chosenQRpaymentData
          ? servicesQR && (
            <QRServiceOption services={servicesQR} />
          )
          : chosenTransference && (
            <TransferenceOption transferenceData={chosenTransference} />
          )
      }
      <PaymentsServiceFooter kindOfService={kindOfService} />
    </main>
  )
}
