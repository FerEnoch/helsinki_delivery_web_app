'use client'
import classes from './PaymentOptions.module.css'
import PaymentOption from './PaymentOption'
import { PAYMENT_OPTIONS } from '@/shared/model/payment_options'
import { useState } from 'react'
import ZonesPromptDialog from '@/widgets/zones/ZonesPromptDialog'
import useTimeBlockerToast from '@/entities/lib/timeBlocker/useTimeBlockerToast'
import { Toaster } from 'sonner'

let firstTime = true

export default function PaymentOptions () {
  const [openModalDialog, setOpenModalDialog] = useState(false)
  const { disabledApp } = useTimeBlockerToast()

  const closeDialog = () => {
    setOpenModalDialog(false)
    firstTime = false
  }

  const openDialog = () => {
    if (!firstTime) return
    setOpenModalDialog(true)
  }

  return (
    <>
      <section className={classes.payment_options_container}>
        {
        PAYMENT_OPTIONS.map(({ id, label, comment }, methodIndex) => {
          return (
            <PaymentOption
              key={id}
              id={id}
              label={label}
              comment={comment}
              openZonesModal={() => openDialog()}
            >
              {PAYMENT_OPTIONS[methodIndex].icon}
            </PaymentOption>
          )
        })
      }
      </section>
      <ZonesPromptDialog
        disabledApp={disabledApp}
        openModal={openModalDialog}
        closeDialog={closeDialog}
      />
      <Toaster />
    </>
  )
}
