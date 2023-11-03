'use client'
import classes from './PaymentsPageFooter.module.css'
import { i18n } from '@/shared/model/i18n'
import TotalCartAmount from '../../cart/ui/TotalCartAmount'
import GoToPayMethod from '@/features/formFill/ui/GoToPayMethod'
import GoToForm from '@/features/formFill/ui/GoToForm'
import { useAppStore } from '@/entities/lib/store'

const { CART: { FOOTER_BUTTONS: cartButtons } } = i18n.LANG.ESP.UI

export default function PaymentsPagFooter ({ label }) {
  const { paymentMethod: { receipt } } = useAppStore()

  const clientNeedToPay = receipt === 'REQUIRED' && label === cartButtons.CONFIRM_ORDER
  // const renderGoToForm = receipt === 'NOT_REQUIRED' && label === cartButtons.FORM.GO_TO_FORM

  return (
    <footer className={classes.footer_container}>
      <TotalCartAmount label={cartButtons.TOTAL_CART_AMOUNT} />
      {
        clientNeedToPay
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
