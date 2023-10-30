import TriangleButton from '@/shared/ui/lib/TriangleButton'
import Link from 'next/link'
import classes from './GoToPaymentButton.module.css'

export default function GoToPayment ({ label }) {
  return (
    <div className={classes.go_to_payment_button}>
      <Link href='/cart/payments'>
        <p className={classes.text}>
          {label.toUpperCase()}
        </p>
        <span className={classes.triangle_button}>
          <TriangleButton
            slideDirection='x'
            width={15}
            height={15}
            triangleStyle={{ fill: 'white' }}
          />
        </span>
      </Link>
    </div>
  )
}
