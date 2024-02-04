'use client'
import FormFooter from '@/features/formFill/ui/FormFooter'
import classes from './PurchaseSummary.module.css'
import ContinuePurchaseButton from '@/entities/payment/ui/ContinuePurchaseButton'
// import { useAppStore } from '@/entities/lib/store'
import ProductsSummary from './ProductsSummary'
import DeliverySummary from './DeliverySummary'
import TotalSummary from './TotalSummary'
// import { useEffect, useState } from 'react'
import { i18n } from '@/shared/model/i18n'
// import PurchaseSummaryPageFooter from './PurchaseSummaryPageFooter'
import { usePathname, useRouter } from 'next/navigation'
import DatetimeSection from './DatetimeSection'
import { useAppStore } from '@/entities/lib/store'
import PaymentMethodSection from './PaymentMethodSection'

const { PURCHASE_SUMMARY: { label: purchaseSummaryPath } } = i18n.LANG.ESP.UI.MENU

export default function PurchaseSummary ({ closeFormDialog }) {
  const { cart, formSuccessfulSubmitOperation, paymentMethod: { label: receiptLabel } } = useAppStore()
  const router = useRouter()
  const pathName = usePathname()
  const isPurchaseSummaryPage = pathName?.includes(encodeURIComponent(purchaseSummaryPath))

  const handleBackButton = () => {
    if (formSuccessfulSubmitOperation) return router.push('/')
    router.back()
  }

  return (
    <section className={classes.purchase_summary_container}>
      {
        isPurchaseSummaryPage && (
          <>
            <div className={classes.red_line} />
            <DatetimeSection />
          </>
        )
      }
      <div className={classes.red_line} />
      <ProductsSummary />
      {
        cart.length > 0 && (
          <>
            <div className={classes.red_line} />
            <DeliverySummary />
          </>
        )
      }
      {receiptLabel && (
        <>
          <div className={classes.red_line} />
          <PaymentMethodSection />
        </>
      )}
      <div className={classes.red_line} />
      <TotalSummary />
      {
      isPurchaseSummaryPage
        ? <FormFooter closeDialog={handleBackButton} />
        : (
          <FormFooter closeDialog={closeFormDialog}>
            <ContinuePurchaseButton />
          </FormFooter>
          )
      }
    </section>
  )
}
