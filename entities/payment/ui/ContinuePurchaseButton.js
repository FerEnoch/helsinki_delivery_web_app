'use client'
import GoToPayMethod from '@/features/formFill/ui/GoToPayMethod'
import GoToForm from '@/features/formFill/ui/GoToForm'
import { useAppStore } from '@/entities/lib/store'
import { i18n } from '@/shared/model/i18n'

const { PAY_METHOD } = i18n.LANG.ESP.UI.CART

export default function ContinuePurchaseButton ({ page, openFormDialog }) {
  const { togglePurchaseSummary, paymentMethod: { receipt } } = useAppStore()
  return (
    (receipt === 'REQUIRED' && page !== PAY_METHOD)
      ? <GoToPayMethod />
      : <GoToForm goToForm={openFormDialog || togglePurchaseSummary} />
  )
}
