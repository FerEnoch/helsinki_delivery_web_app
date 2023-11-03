import PaymentsPageFooter from '@/entities/payment/ui/PaymentsPageFooter'
import classes from './PaymentMethodPage.module.css'
import { i18n } from '@/shared/model/i18n'
import PaymentsPageHeader from '@/entities/payment/ui/PaymentsPageHeader'
import PaymentMethodQR from '@/entities/payment/ui/PaymentMethodQR'

const { CART: cartTexts } = i18n.LANG.ESP.UI

export default function PaymentMethodPage () {
  return (
    <main className={classes.cart_container}>
      <div className={classes.golden_line} />
      <PaymentsPageHeader label={cartTexts.PAY_METHOD} />
      <PaymentMethodQR altText='QR-image' />
      <PaymentsPageFooter label={cartTexts.FOOTER_BUTTONS.FORM.GO_TO_FORM} />
    </main>
  )
}
