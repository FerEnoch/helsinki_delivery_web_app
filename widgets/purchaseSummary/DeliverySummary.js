import { useAppStore } from '@/entities/lib/store'
import classes from './DeliverySummary.module.css'
import SummaryItem from './SummaryItem'
import FormHeader from '../form/FormHeader'
import { i18n } from '@/shared/model/i18n'
import { getCartAmount } from '@/entities/cart/lib/getCartAmount'

const { DELIVERY_COST } = i18n.LANG.ESP.UI.SUMMARY

export default function DeliverySummary () {
  const { cart, paymentMethod, selectedDeliveryMethod } = useAppStore()
  const { cashDiscount } = getCartAmount({ cart, paymentMethod, selectedDeliveryMethod })

  const isCash = paymentMethod?.isCash
  const formattedDiscountLabel = paymentMethod?.label?.toUpperCase()
  const formattedDeliveryLabel = selectedDeliveryMethod?.label?.toUpperCase()

  return (
    <>
      <FormHeader title={DELIVERY_COST} />
      <section className={classes.delivery_cost_section}>
        <ul className={classes.delivery_cost_list}>
          {isCash && (
            <SummaryItem
              name={formattedDiscountLabel}
              total={cashDiscount}
              discount
            />
          )}
          <SummaryItem
            name={formattedDeliveryLabel}
            info={(
              <div className={classes.info}>
                <span className={classes.day}>
                  {selectedDeliveryMethod?.day}
                </span>
                <span className={classes.businessHours}>
                  {selectedDeliveryMethod?.businessHours}
                </span>
              </div>
            )}
            total={selectedDeliveryMethod?.price}
          />
        </ul>
      </section>
    </>
  )
}
