import classes from './TotalSummary.module.css'
import { i18n } from '@/shared/model/i18n'
import FormHeader from '../form/FormHeader'
import SummaryItem from './SummaryItem'
import { useAppStore } from '@/entities/lib/store'

const { TOTAL } = i18n.LANG.ESP.UI.SUMMARY
const formattedTotal = TOTAL.toUpperCase()

export default function TotalSummary () {
  const { getCartTotalAmount } = useAppStore()
  const formattedTotalPrice = getCartTotalAmount().slice(1)

  return (
    <>
      <FormHeader title={TOTAL} />
      <section className={classes.total_section}>
        <ul className={classes.total_list}>
          <SummaryItem
            name={formattedTotal}
            total={formattedTotalPrice}
          />
        </ul>
      </section>
    </>
  )
}
