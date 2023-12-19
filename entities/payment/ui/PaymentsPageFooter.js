'use client'
import classes from './PaymentsPageFooter.module.css'
import { i18n } from '@/shared/model/i18n'
import TotalCartAmount from '../../cart/ui/TotalCartAmount'
import GoToPayMethod from '@/features/formFill/ui/GoToPayMethod'
import GoToForm from '@/features/formFill/ui/GoToForm'
import { useAppStore } from '@/entities/lib/store'

const { CART: { FOOTER_BUTTONS: { CONFIRM_ORDER, TOTAL_CART_AMOUNT } } } = i18n.LANG.ESP.UI

export default function PaymentsPageFooter ({ label }) {
  const { paymentMethod: { receipt } } = useAppStore()
  const hasClientToPayInAdvance = receipt === 'REQUIRED' && label === CONFIRM_ORDER

  return (
    <footer className={classes.footer_container}>
      <TotalCartAmount label={TOTAL_CART_AMOUNT} />
      {
        hasClientToPayInAdvance
          ? (
            <GoToPayMethod label={label} />
            )
          : (
            <GoToForm label={label} />
            )
      }
    </footer>
  )
}
