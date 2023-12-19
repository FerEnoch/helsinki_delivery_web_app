import CartProductsSlider from '@/entities/cart/ui/CartProductsSlider'
import classes from './CartFirstStep.module.css'
import { i18n } from '@/shared/model/i18n'
import IceOrCigarSlider from '@/features/addToCart/ui/IceOrCigarSlider'
import CartFooter from '@/entities/cart/ui/CartFooter'
import { getAggregates } from '@/entities/product/lib/getAggregates'
import { OFFERED_PRODUCTS } from '@/shared/model/adds_products'

const { CART: { FIRST_STEP_ADDS, FIRST_STEP_TITLE, ADDS_LABELS } } = i18n.LANG.ESP.UI

export default async function CartFirstStep () {
  const [cigarProducts, iceProducts] = await getAggregates()

  return (
    <main className={classes.cart_container}>
      <div className={classes.golden_line} />
      <h2 className={classes.title}>{FIRST_STEP_TITLE.toUpperCase()}</h2>
      <CartProductsSlider />
      {ADDS_LABELS.length > 0 && (
        <section className={classes.adds_section}>
          <div className={classes.add_text}>
            <h2 className={classes.title}>{FIRST_STEP_ADDS.toUpperCase()}</h2>
          </div>
          <div className={classes.ice_or_cigar_sliders}>
            {
              ADDS_LABELS.map(({ label, categoryOffering }) => {
                return (
                  <IceOrCigarSlider
                    key={label}
                    label={label}
                    products={label.match(OFFERED_PRODUCTS[0].regExp) ? [...iceProducts] : [...cigarProducts]}
                    categoryOffering={categoryOffering}
                  />
                )
              })
            }
          </div>
        </section>
      )}
      <CartFooter />
    </main>
  )
}
