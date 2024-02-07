'use client'
import classes from './PurchaseSummaryButton.module.css'
import { i18n } from '@/shared/model/i18n'
import TriangleButton from '@/shared/ui/lib/TriangleButton'

const { SHOW_PURCHASE_SUMMARY } = i18n.LANG.ESP.UI.CART.FOOTER_BUTTONS
const formattedLabel = SHOW_PURCHASE_SUMMARY.toUpperCase()

export default function PurchaseSummaryButton ({ isDisabledModalOpening, openFormDialog }) {
  return (
    <>
      <div
        disabled={isDisabledModalOpening}
        className={classes.purchase_summary_button}
      >
        <section onClick={openFormDialog} className={classes.purchase_summary_action}>
          <p className={classes.action_text}> {formattedLabel} </p>
          <span className={classes.triangle_button}>
            <TriangleButton
              slideDirection='x'
              width={20}
              height={20}
              triangleStyle={{ fill: 'white' }}
            />
          </span>
        </section>
      </div>
    </>
  )
}
