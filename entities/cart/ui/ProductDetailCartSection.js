'use client'
import AddToCartButton from '@/features/addToCart/ui/AddToCartButton'
import SelectQuantitySection from '@/features/addToCart/ui/SelectQuantitySection'
import classes from './ProductDetailCartSection.module.css'
import { useAppStore } from '@/entities/lib/store'
import { memo, useState } from 'react'
import { priceFormater } from '@/shared/lib/priceFormat/priceFormat'
import { codecProBold } from '@/shared/config/fonts'

export default memo(function ProductDetailCartSection ({ product }) {
  const { addToCart } = useAppStore()
  const [productQuantity, setProductQuantity] = useState(1)

  const { price, stock: hasStock, description } = product
  const formattedPrice = priceFormater(price)
  const isDescriptionLong = description?.length > 145

  const handleAddToCart = () => {
    addToCart(product, productQuantity)
  }

  return (
    <section
      style={{
        height: `${isDescriptionLong ? '60%' : '30%'}`
      }}
      className={classes.cart_section}
    >
      <header className={`${classes.product_price} ${codecProBold.className}`}>
        <p>
          {
         hasStock
           ? (
             <span className={classes.price_number}>
               {formattedPrice}
             </span>
             )
           : (
             <span
               style={{
                 color: '#e85a5a',
                 display: 'grid',
                 fontSize: '1.5rem',
                 placeContent: 'center'
               }}
             >
               S/STOCK
             </span>
             )
            }
        </p>
      </header>
      <section className={classes.quantity_cart_section}>
        <span className={classes.product_select_quantity}>
          <SelectQuantitySection disabled={!hasStock} setProductQuantity={setProductQuantity} />
        </span>
        <span className={classes.product_add_to_cart}>
          <AddToCartButton disabled={!hasStock} onClick={handleAddToCart} />
        </span>
      </section>
    </section>
  )
}
)
