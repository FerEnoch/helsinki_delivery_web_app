import classes from './PaymentMethodSection.module.css'
import FormHeader from '../form/FormHeader'
import { i18n } from '@/shared/model/i18n'
import { useAppStore } from '@/entities/lib/store'

const {
  PAYMENT_METHOD: {
    TITLE,
    STATE: {
      RECEIPT_SENT,
      RECEIPT_NOT_SENT
    }
  }
} = i18n.LANG.ESP.UI.SUMMARY

export default function PaymentMethodSection () {
  const { paymentMethod, receiptFile, formSuccessfulSubmitOperation } = useAppStore()

  const message = paymentMethod?.receipt === 'REQUIRED' && (
    (formSuccessfulSubmitOperation && receiptFile)
      ? RECEIPT_SENT
      : RECEIPT_NOT_SENT
  )
  const formattedLabel = paymentMethod?.label?.toUpperCase()

  return (
    <>
      <FormHeader title={TITLE} />
      <section className={classes.delivery_cost_section}>
        <div className={classes.payment_summary_item}>
          <p className={classes.payment_method}>
            {formattedLabel}
          </p>
          <p className={`
          ${classes.payment_state}
          ${formSuccessfulSubmitOperation && classes.receipt_sent}
          `}
          >
            {message && message.toUpperCase()}
          </p>
        </div>
      </section>
    </>
  )
}
