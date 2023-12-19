'use client'
import classes from './ProductPrice.module.css'
import { codecProBold } from '@/shared/config/fonts'
import { memo } from 'react'

export default memo(function ProductPrice ({ price, hasStock }) {
  const isInteger = Number.isInteger(Number(price.replace('$', '')))

  return (
    <span className={`${codecProBold.className} ${classes.product_price}`}>
      <p>
        {
   hasStock
     ? (
       <span
         className={`
         ${classes.price_number} 
         ${isInteger ? classes.is_integer : classes.not_integer}
         `}
       >
         {price}
       </span>
       )
     : (
       <span className={classes.no_stock}>
         S/STOCK
       </span>
       )
      }
      </p>
    </span>
  )
})
