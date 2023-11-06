'use client'
import UncheckedBoxIcon from '@/shared/ui/lib/svg/UncheckedBoxIcon'
import classes from './PaymentOption.module.css'
import CheckedBoxIcon from '@/shared/ui/lib/svg/CheckedBoxIcon'
import { useAppStore } from '@/entities/lib/store'
import { Suspense, useEffect, useState } from 'react'

export default function PaymentOption ({ id, children, label, comment }) {
  const { paymentMethod, pickPaymentOption, setIsShareApiCompatible } = useAppStore()
  const [isChosen, setIsChosen] = useState(undefined)

  const handleChoosePaymentMethod = (id) => {
    return () => {
      const isCompatibleShareAPI = navigator.share().catch(() => {})
      if (isCompatibleShareAPI) setIsShareApiCompatible(true)
      if (id === paymentMethod.id) return pickPaymentOption(undefined)
      pickPaymentOption(id)
    }
  }

  const formatLabel = label.toUpperCase()
  const formatComments = comment.toUpperCase()

  useEffect(() => {
    setIsChosen(paymentMethod?.id === id)
  }, [paymentMethod, id])

  return (
    <section
      onClick={handleChoosePaymentMethod(id)}
      className={classes.payment_option}
    >
      <span
        className={classes.button_wrapper}
        style={{ backgroundColor: `${isChosen ? 'var(--app-payments-green)' : 'var(--app-backgound-gray)'}` }}
      >
        <div className={classes.checkbox}>
          <Suspense>
            {
            isChosen
              ? (
                <span className={classes.checkbox_checked}>
                  <CheckedBoxIcon />
                </span>
                )
              : <UncheckedBoxIcon />
                }
          </Suspense>
        </div>
      </span>
      <span className={classes.icon_wrapper}>
        {children}
      </span>
      <h3 className={classes.payment_label}>{formatLabel}</h3>
      <p className={classes.payment_comment}>{formatComments}</p>
    </section>
  )
}
