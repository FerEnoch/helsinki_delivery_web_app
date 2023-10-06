import TriangleButton from '@/shared/ui/lib/TriangleButton'
import Link from 'next/link'
import classes from './GoToPaymentButton.module.css'

/**
 * TO DO --> usar @payments route (parallel routes) sobre /cart
 * Que sea como un modal - dismiss the modal with
 *      const router = useRouter()
 *      onDismiss => router.back()
 *
 * To ensure that the contents of the modal don't get rendered when it's not
 * active, you can create a default.js file that returns null.
 *
 *         app/@auth/default.tsx
 *         export default function Default() {
 *           return null
 *         }
 */

export default function GoToPayment ({ label }) {
  return (
    <div className={classes.payment_button}>
      <Link href='/cart/payments'>
        <span className={classes.text}>
          {label.toUpperCase()}
        </span>
        <span className={classes.triangle_button}>
          <TriangleButton
            slideDirection='x'
            width={10}
            height={10}
            triangleStyle={{ fill: 'white' }}
          />
        </span>
      </Link>
    </div>
  )
}
