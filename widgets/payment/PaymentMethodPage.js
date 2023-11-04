import PaymentsPageFooter from '@/entities/payment/ui/PaymentsPageFooter'
import classes from './PaymentMethodPage.module.css'
import { i18n } from '@/shared/model/i18n'
import PaymentsPageHeader from '@/entities/payment/ui/PaymentsPageHeader'
import PaymentMethod from '@/entities/payment/ui/PaymentMethod'
import { getCorporativeInfo } from '@/processes/services/model/server/getCorporativeInfo'
import { FIREBASE_DATABASES } from '@/processes/services/config/firebase/databases'

const { CART: cartTexts } = i18n.LANG.ESP.UI
const { PAYMENT_METHODS } = FIREBASE_DATABASES
export default async function PaymentMethodPage () {
  const paymentMethods = await getCorporativeInfo(PAYMENT_METHODS)

  return (
    <main className={classes.cart_container}>
      <div className={classes.golden_line} />
      <PaymentsPageHeader label={cartTexts.PAY_METHOD} />
      <PaymentMethod allPaymentMethods={paymentMethods} />
      <PaymentsPageFooter label={cartTexts.FOOTER_BUTTONS.FORM.GO_TO_FORM} />
    </main>
  )
}
