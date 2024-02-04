'use client'
import classes from './PaymentsPageFooter.module.css'
import { i18n } from '@/shared/model/i18n'
import TotalCartAmount from '../../cart/ui/TotalCartAmount'
import { lazy, useMemo, useRef } from 'react'
import { useFormModal } from '@/features/formFill/lib/useFormModal'
import PurchaseSummaryButton from '@/entities/cart/ui/PurchaseSummaryButton'
import ContinuePurchaseButton from './ContinuePurchaseButton'

const LazyFormDialog = lazy(() => import('@/widgets/form/FormDialog'))

const { CART: { PAY_METHOD, FOOTER_BUTTONS: { TOTAL_CART_AMOUNT } } } = i18n.LANG.ESP.UI

export default function PaymentsPageFooter ({ page }) {
  const dialogRef = useRef()
  const { isDisabledModalOpening, openFormDialog } = useFormModal(dialogRef)

  const formDialog = useMemo(() => <LazyFormDialog ref={dialogRef} />, [dialogRef])

  return (
    <footer className={classes.footer_container}>
      <TotalCartAmount label={TOTAL_CART_AMOUNT} />
      {
        page === PAY_METHOD
          ? <ContinuePurchaseButton page={page} openFormDialog={openFormDialog} />
          : <PurchaseSummaryButton isDisabledModalOpening={isDisabledModalOpening} openFormDialog={openFormDialog} />
      }
      {formDialog}
    </footer>
  )
}
