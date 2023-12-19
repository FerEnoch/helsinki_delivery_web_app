'use client'
import { useAppStore } from '@/entities/lib/store'
import classes from './TotalCartAmount.module.css'
import { priceFormater } from '@/shared/lib/priceFormat/priceFormat'
import { codecProRegular } from '@/shared/config/fonts'

export default function TotalCartAmount ({ label }) {
  const { getCartTotalAmount } = useAppStore()
  const cartTotalAmount = getCartTotalAmount()
  const formattedCartTotal = priceFormater(cartTotalAmount)

  return (
    <div className={classes.total_amount_wrapper}>
      <p className={classes.text}>{label.toUpperCase()}</p>
      <span className={`${classes.amount} ${codecProRegular.className}`}>
        <p>{formattedCartTotal}</p>
      </span>
    </div>
  )
}
