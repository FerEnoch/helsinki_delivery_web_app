import classes from './DeliveryCost.module.css'
import ProductPrice from '@/entities/product/ui/lib/ProductPrice'
import { i18n } from '@/shared/model/i18n'
import { HelsinkiTruck } from '@/shared/ui/lib/svg/HelsinkiTruck'

const costNumber = 1500
const cost = `$${costNumber}`

const { DELIVERY_COST } = i18n.LANG.ESP.UI.CART

export default function DeliveryCost () {
  return (
    <section className={classes.delivery_cost_container}>
      <article className={classes.delivery_cost_item}>
        <div className={classes.item_image}>
          <span className={classes.image_mask}>
            <HelsinkiTruck />
          </span>
        </div>
        <div className={classes.item_background}>
          <span className={classes.item_text}>
            <h2>{DELIVERY_COST.toUpperCase()}</h2>
          </span>
          <ProductPrice price={cost} hasStock />
        </div>
      </article>
    </section>
  )
}
