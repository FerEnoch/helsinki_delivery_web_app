'use client'
import classes from './GoToPayMethod.module.css'
import { useAppStore } from '@/entities/lib/store'
import TriangleButton from '@/shared/ui/lib/TriangleButton'
import { useRouter } from 'next/navigation'

export default function GoToPayMethod ({ label }) {
  const router = useRouter()
  const { cart, paymentMethod } = useAppStore()

  const cartHasProducts = cart.length > 0

  const goToPaymentMethod = () => router.push('/cart/payments/pay-method')

  return (
    <div
      disabled={!cartHasProducts || !paymentMethod?.label}
      className={classes.go_to_payment_method_button}
    >
      <section onClick={goToPaymentMethod} className={classes.go_to_payment_method_action}>
        <p className={classes.action_text}>
          {label.toUpperCase()}
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
