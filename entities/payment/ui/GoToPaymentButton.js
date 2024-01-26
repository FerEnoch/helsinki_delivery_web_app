'use client'
import TriangleButton from '@/shared/ui/lib/TriangleButton'
import Link from 'next/link'
import classes from './GoToPaymentButton.module.css'
import { useAppStore } from '@/entities/lib/store'

export default function GoToPayment ({ label }) {
  const { selectedDeliveryMethod } = useAppStore()

  const hasSelectedDelivery = /delivery/i.test(selectedDeliveryMethod?.label)
  const hasSelectedHours = selectedDeliveryMethod?.day
  const enableButton = hasSelectedDelivery || hasSelectedHours
  const goToPaymentText = label.toUpperCase()

  return (
    <div className={`
    ${classes.go_to_payment_button}
    ${!enableButton && classes.disabled}
    `}
    >
      <Link href={`${enableButton ? '/cart/payments' : ''}`}>
        <p className={classes.text}>
          {goToPaymentText}
        </p>
        <span className={classes.triangle_button}>
          <TriangleButton
            slideDirection='x'
            width={14}
            height={14}
            triangleStyle={{ fill: 'white' }}
          />
        </span>
      </Link>
    </div>
  )
}
