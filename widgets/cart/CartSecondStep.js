import PaymentsPageHeader from '@/entities/payment/ui/PaymentsPageHeader'
import classes from './CartSecondStep.module.css'
import PaymentOptions from '@/features/pay/PaymentOptions'
import CartResume from '@/entities/cart/ui/CartResume'
import PaymentsPageFooter from '@/entities/cart/ui/PaymentsPageFooter'
import { i18n } from '@/shared/model/i18n'

const { CART: cartTexts } = i18n.LANG.ESP.UI

export default function CartSecondStep () {
  return (
    <main className={classes.cart_container}>
      <div className={classes.golden_line} />
      <PaymentsPageHeader label={cartTexts.SECOND_STEP_TITLE} />
      <PaymentOptions />
      <CartResume />
      <PaymentsPageFooter label={cartTexts.FOOTER_BUTTONS.CONFIRM_ORDER} />
    </main>
  )
}
