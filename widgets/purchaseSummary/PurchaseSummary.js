import FormFooter from '@/features/formFill/ui/FormFooter'
import classes from './PurchaseSummary.module.css'
import ContinuePurchaseButton from '@/entities/payment/ui/ContinuePurchaseButton'
import { useAppStore } from '@/entities/lib/store'
import ProductsSummary from './ProductsSummary'
import DeliverySummary from './DeliverySummary'
import TotalSummary from './TotalSummary'

export default function PurchaseSummary ({ closeFormDialog }) {
  const { togglePurchaseSummary } = useAppStore()

  return (
    <section className={classes.purchase_summary_container}>
      <div className={classes.red_line} />
      <ProductsSummary />
      <div className={classes.red_line} />
      <DeliverySummary />
      <div className={classes.red_line} />
      <TotalSummary />
      <FormFooter closeDialog={closeFormDialog}>
        <ContinuePurchaseButton openFormDialog={togglePurchaseSummary} />
      </FormFooter>
    </section>
  )
}
