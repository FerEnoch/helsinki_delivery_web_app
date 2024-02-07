import classes from './ProductsSummary.module.css'
import { useAppStore } from '@/entities/lib/store'
import SummaryItem from './SummaryItem'
import { i18n } from '@/shared/model/i18n'
import FormHeader from '../form/FormHeader'
import { usePathname } from 'next/navigation'

const {
  SUMMARY: {
    CAPTURE_THIS, TITLE
  }, MENU: {
    PURCHASE_SUMMARY: {
      label: purchaseSummaryPath
    }
  }
} = i18n.LANG.ESP.UI

export default function ProductsSummary () {
  const { cart } = useAppStore()
  const pathName = usePathname()

  const isPurchaseSummaryPage = pathName?.includes(encodeURIComponent(purchaseSummaryPath))
  const formattedTitle = `${isPurchaseSummaryPage ? '' : CAPTURE_THIS} ${TITLE}`

  return (
    <>
      <FormHeader title={formattedTitle} />
      <section className={classes.products_summary_section}>
        <ul className={classes.products_list}>
          {
          cart.map(({ name, quantity, price }) => {
            const formattedName = name.toUpperCase()
            const formattedQuantity = String(quantity)
            const formattedTotal = String(quantity * price || price)
            return (
              <SummaryItem
                key={name}
                name={formattedName}
                info={(
                  <span className={classes.info}>
                    <span className={classes.x}>x</span>{formattedQuantity}
                  </span>
                  )}
                total={formattedTotal}
              />
            )
          })
              }
        </ul>
      </section>
    </>
  )
}
