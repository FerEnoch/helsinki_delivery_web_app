'use client'
import classes from './ProductPrice.module.css'
import { codecProBold } from '@/shared/config/fonts'
import { Suspense, memo } from 'react'

export default memo(function ProductPrice ({ price, hasStock }) {
  const isInteger = Number.isInteger(Number(price.replace('$', '')))

  return (
    <span className={`${codecProBold.className} ${classes.product_price}`}>
      <p>
        {
   hasStock
     ? (
       <Suspense>
         <span
           style={{
             display: 'grid',
             fontSize: `${isInteger ? '1.5rem' : '1.4rem'}`,
             placeContent: 'center'
           }}
         >
           {price}
         </span>
       </Suspense>
       )
     : (
       <span style={{
         color: '#e85a5a',
         display: 'grid',
         fontSize: '.8rem',
         placeContent: 'center'
       }}
       >
         S/STOCK
       </span>
       )
      }
      </p>
    </span>
  )
})
