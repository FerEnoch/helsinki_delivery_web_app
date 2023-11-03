import PaymentsPageFooter from '@/entities/payment/ui/PaymentsPageFooter'
import classes from './PaymentMethodPage.module.css'
import { i18n } from '@/shared/model/i18n'
import PaymentsPageHeader from '@/entities/payment/ui/PaymentsPageHeader'
import PaymentMethod from '@/entities/payment/ui/PaymentMethod'
import { getAppInfo } from '@/processes/services/model/server/getAppInfo'

const { CART: cartTexts } = i18n.LANG.ESP.UI

export default async function PaymentMethodPage () {
  const { paymentMethods } = await getAppInfo()
  const [transferMethod, ...QRMethod] = JSON.parse(paymentMethods)
  console.log([transferMethod, ...QRMethod])
  return (
    <main className={classes.cart_container}>
      <div className={classes.golden_line} />
      <PaymentsPageHeader label={cartTexts.PAY_METHOD} />
      <PaymentMethod paymentMethods={JSON.parse(paymentMethods)} />
      <PaymentsPageFooter label={cartTexts.FOOTER_BUTTONS.FORM.GO_TO_FORM} />
    </main>
  )
}
