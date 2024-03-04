import { useAppStore } from '@/entities/lib/store'
import ProductImage from '@/entities/product/ui/lib/ProductImage'
import ProductPrice from '@/entities/product/ui/lib/ProductPrice'
import AddToCartButton from '@/features/addToCart/ui/AddToCartButton'
import SelectQuantitySection from '@/features/addToCart/ui/SelectQuantitySection'
import { priceFormater } from '@/shared/lib/priceFormat/priceFormat'
import { useState } from 'react'
import classes from './Combo.module.css'
import Link from 'next/link'

export function Combo ({ combo, height }) {
  const { addToCart } = useAppStore()
  const [productQuantity, setProductQuantity] = useState(1)

  const { id, category, name, image, imageID, price, featInfo, stock, description } = combo
  const formattedPrice = priceFormater(price)
  const comboName = name.toUpperCase()
  const comboFeatMessage = featInfo && featInfo.toUpperCase()

  const handleAddToCart = () => {
    addToCart(combo, productQuantity)
  }

  return (
    <li
      className={classes.combo_item}
      style={{ height }}
    >
      <div className={classes.combo_image}>
        <Link
          href={`/${encodeURIComponent(category)}/detail/${encodeURIComponent(id)}`}
          prefetch={false}
        >
          <div className={classes.image_mask}>
            <ProductImage
              width={40}
              height={65}
              alt={comboName}
              src={image}
              imageID={imageID}
              category={category}
            />
          </div>
        </Link>
      </div>
      <div className={classes.combo_background}>
        <section className={classes.name_message}>
          <h2 className={classes.combo_name}>
            {comboName}
          </h2>
          {featInfo && (
            <p className={classes.combo_featMessage}>
              {comboFeatMessage}
            </p>
          )}
        </section>
        <p className={classes.combo_description}>
          {description}
        </p>
        <div className={classes.combo_buySection}>
          <ProductPrice price={formattedPrice} hasStock={stock} />
          <div className={classes.combo_selection}>
            <span className={classes.combo_select_quantity}>
              <SelectQuantitySection setProductQuantity={setProductQuantity} />
            </span>
            <span className={classes.combo_add_to_cart}>
              <AddToCartButton onClick={handleAddToCart} />
            </span>
          </div>
        </div>
      </div>
    </li>
  )
}
