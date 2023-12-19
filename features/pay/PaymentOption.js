'use client'
import UncheckedBoxIcon from '@/shared/ui/lib/svg/UncheckedBoxIcon'
import classes from './PaymentOption.module.css'
import CheckedBoxIcon from '@/shared/ui/lib/svg/CheckedBoxIcon'
import { useAppStore } from '@/entities/lib/store'
import { useEffect, useState } from 'react'
import { i18n } from '@/shared/model/i18n'

const { DISCOUNT_PIN } = i18n.LANG.ESP.UI

export default function PaymentOption ({ id, isCash, label, comment, openZonesModal, children }) {
  const { paymentMethod, pickPaymentOption } = useAppStore()

  const [isChosen, setIsChosen] = useState(undefined)

  const handleChoosePaymentMethod = (id) => () => {
    if (id === paymentMethod.id) return pickPaymentOption(undefined)
    pickPaymentOption(id)
  }

  const formatLabel = label.toUpperCase()
  const formatComments = comment.toUpperCase()

  useEffect(() => {
    setIsChosen(paymentMethod?.id === id)
  }, [paymentMethod, id, openZonesModal])

  useEffect(() => {
    if (isChosen) openZonesModal()
  }, [isChosen, openZonesModal])

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
          {
            isChosen
              ? (
                <span className={classes.checkbox_checked}>
                  <CheckedBoxIcon />
                </span>
                )
              : <UncheckedBoxIcon />
         }
        </div>
      </span>
      <span className={classes.icon_wrapper}>
        {children}
      </span>
      <h3 className={classes.payment_label}>{formatLabel}</h3>
      <p className={classes.payment_comment}>{formatComments}</p>
      {
        isCash && (
          <div className={classes.discount_pin}>
            {DISCOUNT_PIN}
          </div>
        )
      }
    </section>
  )
}
