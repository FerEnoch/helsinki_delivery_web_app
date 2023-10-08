import PaymentsPageHeader from '@/entities/payment/ui/PaymentsPageHeader'
import classes from './CartSecondStep.module.css'
import PaymentOptions from '@/features/pay/PaymentOptions'
import CartResume from '@/entities/cart/ui/CartResume'
import PaymentsPageFooter from '@/entities/cart/ui/PaymentsPageFooter'

/**
 * Traer los datos de los medios de pago y CBU del server acá o en page.js
 */
export default function CartSecondStep () {
  return (
    <main className={classes.cart_container}>
      <div className={classes.golden_line} />
      <PaymentsPageHeader />
      <PaymentOptions />
      <CartResume />
      <PaymentsPageFooter />
    </main>
  )
}
