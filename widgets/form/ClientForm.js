import { useFormSubscription } from '@/features/formFill/lib/useFormSubscription'
import classes from './ClientForm.module.css'

export default function ClientForm ({ children }) {
  const { submitHandler } = useFormSubscription()

  return (
    <form
      onSubmit={submitHandler}
      className={classes.client_form}
    >
      {children}
    </form>
  )
}
