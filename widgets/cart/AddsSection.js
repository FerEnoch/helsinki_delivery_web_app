import IceOrCigarSlider from '@/features/addToCart/ui/IceOrCigarSlider'
import { OFFERED_PRODUCTS } from '@/shared/model/adds_products'
import classes from './AddsSection.module.css'
import { i18n } from '@/shared/model/i18n'
import { getAggregates } from '@/entities/product/lib/getAggregates'

const { CART: { FIRST_STEP_ADDS, ADDS_LABELS } } = i18n.LANG.ESP.UI

export default async function AddsSection () {
  const [cigarProducts, iceProducts] = await getAggregates()

  return (
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
  )
}
