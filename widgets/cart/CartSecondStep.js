import PaymentsPageHeader from '@/entities/payment/ui/PaymentsPageHeader'
import classes from './CartSecondStep.module.css'
import PaymentOptions from '@/features/pay/PaymentOptions'
import CartSummary from '@/entities/cart/ui/CartSummary'
import PaymentsPageFooter from '@/entities/payment/ui/PaymentsPageFooter'
import { i18n } from '@/shared/model/i18n'

const { CART: { SECOND_STEP_TITLE } } = i18n.LANG.ESP.UI

export default function CartSecondStep () {
  return (
    <main className={classes.cart_container}>
      <div className={classes.golden_line} />
      <PaymentsPageHeader label={SECOND_STEP_TITLE} />
      <PaymentOptions />
      <CartSummary />
      <PaymentsPageFooter page={SECOND_STEP_TITLE} />
    </main>
  )
}
