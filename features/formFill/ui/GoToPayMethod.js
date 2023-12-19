'use client'
import classes from './GoToPayMethod.module.css'
import { useAppStore } from '@/entities/lib/store'
import TriangleButton from '@/shared/ui/lib/TriangleButton'
import { useRouter } from 'next/navigation'

export default function GoToPayMethod ({ label }) {
  const router = useRouter()
  const { cart, paymentMethod } = useAppStore()

  const disableOpenForm = !(cart.length > 0) || !paymentMethod?.label
  const formatedLebel = label.toUpperCase()

  const goToPaymentMethod = () => !disableOpenForm && router.push('/cart/payments/pay-method')

  return (
    <div
      disabled={disableOpenForm}
      className={classes.go_to_payment_method_button}
    >
      <section onClick={goToPaymentMethod} className={classes.go_to_payment_method_action}>
        <p className={classes.action_text}>
          {formatedLebel}
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
