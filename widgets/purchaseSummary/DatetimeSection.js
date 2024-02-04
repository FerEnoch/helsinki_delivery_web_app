import { i18n } from '@/shared/model/i18n'
import FormHeader from '../form/FormHeader'
import classes from './DatetimeSection.module.css'
import { useEffect, useState } from 'react'
import { timeFormatter } from '@/shared/lib/timeFormat'
import { useAppStore } from '@/entities/lib/store'

const {
  PURCHASE_SUMMARY: {
    label: purchaseSummaryPath,
    SUMMARY_FIELDS: {
      DATE_LABEL,
      ORDER_STATE: {
        label,
        STATES: {
          ORDER_SENT,
          NOT_SENT,
          NO_PRODUCTS
        }
      }
    }
  }
} = i18n.LANG.ESP.UI.MENU

export default function DatetimeSection () {
  const [datetime, setDatetime] = useState(null)
  const { formSuccessfulSubmitOperation, cart } = useAppStore()

  useEffect(() => {
    const date = new Date()
    setDatetime(timeFormatter(date))
  }, [])

  const dateLabel = DATE_LABEL?.toUpperCase()
  const formattedDatetime = datetime?.toUpperCase()
  const formattedStateLabel = label?.toUpperCase()
  const orderState = formSuccessfulSubmitOperation
    ? ORDER_SENT
    : (
        cart.length > 0
          ? NOT_SENT
          : NO_PRODUCTS
      )

  return (
    <>
      <FormHeader title={purchaseSummaryPath} />
      <section className={classes.summary_page_header}>
        <div className={classes.datetime_section}>
          <div className={classes.datetime_label}>
            {dateLabel}
          </div>
          <div className={classes.datetime}>
            {formattedDatetime}
          </div>
        </div>
        <div className={classes.order_state_section}>
          <div className={classes.state_label}>
            {formattedStateLabel}
          </div>
          <div className={`
          ${classes.state}
          ${formSuccessfulSubmitOperation && classes.order_sent}
          `}
          >
            {orderState?.toUpperCase()}
          </div>
        </div>
      </section>
    </>
  )
}
