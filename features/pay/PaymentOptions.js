'use client'
import classes from './PaymentOptions.module.css'
import PaymentOption from './PaymentOption'
import { PAYMENT_OPTIONS } from '@/shared/model/payment_options'
import useTimeBlockerToast from '@/entities/lib/timeBlocker/useTimeBlockerToast'
import { Toaster } from 'sonner'
import { useAppStore } from '@/entities/lib/store'
import ZonesPrompt from '@/widgets/zones/ZonesPrompt'
import WarningDialog from '@/shared/ui/lib/warningModal/WarningDialog'
import { useWarningModal } from '@/shared/ui/lib/warningModal/useWarningModal'
import BlockedAppPrompt from '@/widgets/blockedApp/BlockedAppPrompt'

export default function PaymentOptions () {
  const { openModalDialog, closeDialog, openDialog } = useWarningModal()
  const { isAppBlocked, client: { takeAway } } = useAppStore()
  useTimeBlockerToast()

  return (
    <>
      <section className={classes.payment_options_container}>
        {
        PAYMENT_OPTIONS.map(({ id, isCash, label, takeAwayLabel, comment }, methodIndex) => {
          let paymentLabel = label
          if (takeAway && takeAwayLabel) paymentLabel = takeAwayLabel
          return (
            <PaymentOption
              key={id}
              id={id}
              label={paymentLabel}
              isCash={isCash}
              comment={comment}
              openZonesModal={() => openDialog()}
            >
              {PAYMENT_OPTIONS[methodIndex].icon}
            </PaymentOption>
          )
        })
      }
      </section>
      {
        !takeAway && (
          <WarningDialog
            openModal={openModalDialog}
            closeDialog={closeDialog}
          >
            <ZonesPrompt closeDialog={closeDialog} />
          </WarningDialog>
        )
      }
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
      <Toaster />
    </>
  )
}
