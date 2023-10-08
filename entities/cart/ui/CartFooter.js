import classes from './CartFooter.module.css'
import { i18n } from '@/shared/model/i18n'
import ClearCart from '@/features/addToCart/ui/ClearCart'
import TotalCartAmount from './TotalCartAmount'
import BackButton from '@/shared/ui/lib/BackButton'
import GoToPayment from './GoToPaymentButton'

const { CART: { FOOTER_BUTTONS: cartButtons } } = i18n.LANG.ESP.UI

export default function CartFooter () {
  return (
    <footer className={classes.footer_container}>
      <BackButton label={cartButtons.BACK} />
      <ClearCart label={cartButtons.CLEAR_CART} />
      <TotalCartAmount label={cartButtons.TOTAL_CART_AMOUNT} />
      <GoToPayment label={cartButtons.NEXT_STEP} />
    </footer>
  )
}
