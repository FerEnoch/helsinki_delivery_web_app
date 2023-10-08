import classes from './PaymentsPageFooter.module.css'

import { i18n } from '@/shared/model/i18n'
import TotalCartAmount from './TotalCartAmount'
import GoToForm from '@/features/formFill/ui/GoToForm'

const { CART: { FOOTER_BUTTONS: cartButtons } } = i18n.LANG.ESP.UI

export default function PaymentsPageFooter () {
  return (
    <footer className={classes.footer_container}>
      <TotalCartAmount label={cartButtons.TOTAL_CART_AMOUNT} />
      <GoToForm label={cartButtons.FORM.GO_TO_FORM} />
    </footer>
  )
}
