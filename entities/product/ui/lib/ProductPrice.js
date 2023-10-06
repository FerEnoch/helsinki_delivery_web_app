import { priceFormater } from '@/shared/lib/priceFormat/priceFormat'
import classes from './ProductPrice.module.css'

export default function ProductPrice ({ price, hasStock }) {
  return (
    <span className={classes.product_price}>
      <p>
        {
   hasStock
     ? (
       <span style={{
         display: 'grid',
         fontSize: `${Number.isInteger(Number(price)) ? '1.3rem' : '1.15rem'}`,
         placeContent: 'center'
       }}
       >
         {priceFormater(price)}
       </span>
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
}
