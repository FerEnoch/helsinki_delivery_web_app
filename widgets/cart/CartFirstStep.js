import CartProductsSlider from '@/entities/cart/ui/CartProductsSlider'
import classes from './CartFirstStep.module.css'
import { i18n } from '@/shared/model/i18n'
import CartFooter from '@/entities/cart/ui/CartFooter'
import AddsSection from './AddsSection'
// import DeliveryCost from './DeliveryCost'

const { CART: { FIRST_STEP_TITLE, ADDS_LABELS } } = i18n.LANG.ESP.UI

export default function CartFirstStep () {
  return (
    <main className={classes.cart_container}>
      <div className={classes.golden_line} />
      <h2 className={classes.title}>{FIRST_STEP_TITLE.toUpperCase()}</h2>
      <CartProductsSlider />
      {ADDS_LABELS.length > 0 && <AddsSection />}
      {/* <DeliveryCost /> */}
      <CartFooter />
    </main>
  )
}
