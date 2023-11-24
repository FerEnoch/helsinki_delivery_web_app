import classes from './CartFooter.module.css'
import { i18n } from '@/shared/model/i18n'
import ClearCart from '@/features/addToCart/ui/ClearCart'
import TotalCartAmount from './TotalCartAmount'
import BackButton from '@/shared/ui/lib/BackButton'
import GoToPayment from '@/entities/payment/ui/GoToPaymentButton'

const {
  CART: {
    FOOTER_BUTTONS: {
      BACK,
      CLEAR_CART,
      TOTAL_CART_AMOUNT,
      GO_TO_PAYMENTS
    }
  }
} = i18n.LANG.ESP.UI

export default function CartFooter () {
  return (
    <footer className={classes.footer_container}>
      <BackButton label={BACK} />
      <ClearCart label={CLEAR_CART} />
      <TotalCartAmount label={TOTAL_CART_AMOUNT} />
      <GoToPayment label={GO_TO_PAYMENTS} />
    </footer>
  )
}
