'use client'
import classes from './GoToPayMethod.module.css'
import { useAppStore } from '@/entities/lib/store'
import { i18n } from '@/shared/model/i18n'
import TriangleButton from '@/shared/ui/lib/TriangleButton'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const { CART: { FOOTER_BUTTONS: { CONFIRM_ORDER } } } = i18n.LANG.ESP.UI
const formatedLabel = CONFIRM_ORDER.toUpperCase()

export default function GoToPayMethod () {
  const { cart, paymentMethod } = useAppStore()
  const [disableOpenForm, setDisableOpenForm] = useState(null)
  const router = useRouter()

  useEffect(() => {
    setDisableOpenForm(!(cart.length > 0) || !paymentMethod?.label)
  }, [cart, paymentMethod])

  const goToPaymentMethod = () => !disableOpenForm && router.push('/cart/payments/pay-method')

  return (
    <div
      disabled={disableOpenForm}
      className={classes.go_to_payment_method_button}
    >
      <section onClick={goToPaymentMethod} className={classes.go_to_payment_method_action}>
        <p className={classes.action_text}>
          {formatedLabel}
        </p>
        <span className={classes.triangle_button}>
          <TriangleButton
            slideDirection='x'
            width={20}
            height={20}
            triangleStyle={{ fill: 'white' }}
          />
        </span>
      </section>
    </div>
  )
}
