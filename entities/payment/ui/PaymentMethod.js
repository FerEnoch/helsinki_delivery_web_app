'use client'
import classes from './PaymentMethod.module.css'
import TransferenceOption from './TransferenceOption'
import { useShowPaymentMethod } from '../model/useShowPaymentMethod'
import PaymentsServiceFooter from '../../../features/sharePaymentData/ui/PaymentsServiceFooter'
import QRServiceOption from './QRServiceOption'
import { useMemo } from 'react'
import SuspenseFallbackLogo from '@/shared/ui/lib/SuspenseFallbackLogo'
import BlockedAppPrompt from '@/widgets/blockedApp/BlockedAppPrompt'
import { useWarningModal } from '@/shared/ui/lib/warningModal/useWarningModal'
import { useAppStore } from '@/entities/lib/store'
import WarningDialog from '@/shared/ui/lib/warningModal/WarningDialog'

export default function PaymentMethod ({ allPaymentMethods }) {
  const { openModalDialog, closeDialog } = useWarningModal()
  const { isAppBlocked } = useAppStore()
  const { chosenQRpaymentData, servicesQR, chosenTransference, kindOfService } = useShowPaymentMethod(allPaymentMethods)

  const memoServices = useMemo(() => servicesQR, [servicesQR])
  const memoTransferenceData = useMemo(() => chosenTransference, [chosenTransference])
  const memodKindOfService = useMemo(() => kindOfService, [kindOfService])

  return (
    <>
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
      {
       isAppBlocked && (
         <WarningDialog
           openModal={openModalDialog}
           closeDialog={closeDialog}
           blockedApp={isAppBlocked}
         >
           <BlockedAppPrompt closeDialog={closeDialog} />
         </WarningDialog>
       )
    }
    </>
  )
}
