'use client'
import { useAppStore } from '@/entities/lib/store'
import classes from './TotalCartAmount.module.css'
import { priceFormater } from '@/shared/lib/priceFormat/priceFormat'

export default function TotalCartAmount ({ label }) {
  const { getCartTotalAmount } = useAppStore()
  const cartTotalAmount = getCartTotalAmount()
  const formattedCartTotal = priceFormater(cartTotalAmount)

  return (
    <div className={classes.total_amount_wrapper}>
      <p className={classes.text}>{label.toUpperCase()}</p>
      <span className={classes.mount}>
        <p>{formattedCartTotal}</p>
      </span>
    </div>
  )
}
