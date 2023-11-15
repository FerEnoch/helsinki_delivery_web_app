'use client'
import classes from './PaymentMethod.module.css'
import TransferenceOption from './TransferenceOption'
import { useShowPaymentMethod } from '../model/useShowPaymentMethod'
import PaymentsServiceFooter from '../../../features/sharePaymentData/ui/PaymentsServiceFooter'
import QRServiceOption from './QRServiceOption'
import { useMemo } from 'react'
import SuspenseFallbackLogo from '@/shared/ui/lib/SuspenseFallbackLogo'

export default function PaymentMethod ({ allPaymentMethods }) {
  const { chosenQRpaymentData, servicesQR, chosenTransference, kindOfService } = useShowPaymentMethod(allPaymentMethods)

  const memoServices = useMemo(() => servicesQR, [servicesQR])
  const memoTransferenceData = useMemo(() => chosenTransference, [chosenTransference])
  const memodKindOfService = useMemo(() => kindOfService, [kindOfService])

  return (
    <main className={classes.method_container}>
      <SuspenseFallbackLogo>
        {
        chosenQRpaymentData
          ? servicesQR && (
            <QRServiceOption services={memoServices} />
          )
          : chosenTransference && (
            <TransferenceOption transferenceData={memoTransferenceData} />
          )
          }
        <PaymentsServiceFooter kindOfService={memodKindOfService} />
      </SuspenseFallbackLogo>
    </main>
  )
}
