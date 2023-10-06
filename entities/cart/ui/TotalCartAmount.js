'use client'
import { useAppStore } from '@/entities/lib/store'
import classes from './TotalCartAmount.module.css'
import { priceFormater } from '@/shared/lib/priceFormat/priceFormat'

export default function TotalCartAmount ({ label }) {
  const { getCartTotalAmount } = useAppStore()
  const totalCartAmount = priceFormater(getCartTotalAmount())

  return (
    <div className={classes.total_amount_button}>
      <p className={classes.text}>{label.toUpperCase()}</p>
      <span className={classes.mount}>
        <p>{totalCartAmount}</p>
      </span>
    </div>
  )
}
