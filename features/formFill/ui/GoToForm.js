import TriangleButton from '@/shared/ui/lib/TriangleButton'
import classes from './GoToForm.module.css'
import Link from 'next/link'
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

export default function GoToForm ({ label }) {
  return (
    <div className={classes.go_to_form_button}>
      <Link href='/'>
        <p className={classes.text}>
          {label.toUpperCase()}
        </p>
        <span className={classes.triangle_button}>
          <TriangleButton
            slideDirection='x'
            width={12}
            height={12}
            triangleStyle={{ fill: 'white' }}
          />
        </span>
      </Link>
    </div>
  )
}
