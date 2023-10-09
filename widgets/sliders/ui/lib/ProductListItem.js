import PlusInfoButton from '@/entities/product/ui/lib/PlusInfoButton'
import ProductImage from '@/entities/product/ui/lib/ProductImage'
import ProductPrice from '@/entities/product/ui/lib/ProductPrice'
import AddToCartButton from '@/features/addToCart/ui/AddToCartButton'
import SelectQuantitySection from '@/features/addToCart/ui/SelectQuantitySection'
import Link from 'next/link'
import classes from './ProductListItem.module.css'
import { useAppStore } from '@/entities/lib/store'
import { useState } from 'react'

export default function ProductListItem ({ isCigarOrExtra, product }) {
  const { addToCart } = useAppStore()
  const [productQuantity, setProductQuantity] = useState(1)

  const { id, category, name, image, price, stock: hasStock } = product

  const handleAddToCart = () => {
    addToCart({ ...product }, productQuantity)
  }

  return (
    <article>
      <li className={classes.product_item}>
        <Link href={`/${encodeURIComponent(category)}/detail/${encodeURIComponent(id)}`} prefetch={false}>
          <span className={classes.plusInfoButton_wrapper}>
            <PlusInfoButton />
          </span>
          <span className={classes.product_image}>
            <div className={classes.image_mask}>
              <ProductImage
                width={!isCigarOrExtra ? 50 : null}
                height={!isCigarOrExtra ? 75 : null}
                alt={name}
                src={image}
                category={category}
              />
            </div>
          </span>
        </Link>
        <div className={classes.product_background}>
          <span className={classes.product_name}>
            <Link href={`/${encodeURIComponent(category)}/detail/${encodeURIComponent(id)}`} prefetch={false}>
              <h2>{name.toUpperCase()}</h2>
            </Link>
          </span>
          <ProductPrice price={price} hasStock={hasStock} />
          <span className={classes.product_select_quantity}>
            <SelectQuantitySection disabled={!hasStock} setProductQuantity={setProductQuantity} />
          </span>
          <span className={classes.product_add_to_cart}>
            <AddToCartButton disabled={!hasStock} onClick={handleAddToCart} />
          </span>
        </div>
      </li>
    </article>
  )
}
