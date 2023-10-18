'use client'
import { useAppStore } from '@/entities/lib/store'
import classes from './TotalCartAmount.module.css'
import { priceFormater } from '@/shared/lib/priceFormat/priceFormat'
import { Suspense } from 'react'

export default function TotalCartAmount ({ label }) {
  const { getCartTotalAmount } = useAppStore()
  const cartTotalAmount = getCartTotalAmount()
  const formattedCartTotal = priceFormater(cartTotalAmount)

  return (
    <div className={classes.total_amount_wrapper}>
      <p className={classes.text}>{label.toUpperCase()}</p>
      <Suspense>
        <span className={classes.mount}>
          <p>{formattedCartTotal}</p>
        </span>
      </Suspense>
    </div>
  )
}
