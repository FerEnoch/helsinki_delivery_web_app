import ProductImage from '@/entities/product/ui/lib/ProductImage'
import ProductPrice from '@/entities/product/ui/lib/ProductPrice'
import { i18n } from '@/shared/model/i18n'
import Link from 'next/link'
import CartUnitsSection from './CartUnitsSection'
import { useAppStore } from '@/entities/lib/store'
import classes from './CartItem.module.css'
import { useEffect } from 'react'
import { priceFormater } from '@/shared/lib/priceFormat/priceFormat'

const { DETAIL_CARD_PRODUCT: { FOOTER: cardFooterTexts } } = i18n.LANG.ESP.UI

export default function CartItem ({ product, showArrows }) {
  const { cart } = useAppStore()
  const { id, category, name, image, price, stock: hasStock } = product
  const productName = name?.toUpperCase()
  const formattedPrice = priceFormater(price)
  const isCigarOrExtra = cardFooterTexts.generic_action.categories.find(categRegExp => categRegExp.test(category))

  useEffect(() => {
    showArrows(cart.length)
  }, [cart, showArrows])

  return (
    <article
      key={id}
      style={{
        width: `${cart?.length === 1 ? '105%' : '100%'}`,
        paddingInlineEnd: `${cart?.length === 1 ? '1.5rem' : ''}`
      }}
    >
      <li className={classes.product_item}>
        <div className={classes.product_image}>
          <Link href={`/${encodeURIComponent(category)}/detail/${encodeURIComponent(id)}`} prefetch={false}>
            <div className={classes.image_mask}>
              <ProductImage
                width={isCigarOrExtra ? 30 : 75}
                height={isCigarOrExtra ? 50 : 106}
                alt={name}
                src={image}
                category={category}
              />
            </div>
          </Link>
        </div>
        <div className={classes.product_background}>
          <span
            className={classes.product_name}
            style={{ fontSize: `${name?.length > 20 ? '0.8rem' : '1rem'}` }}
          >
            <Link href={`/${encodeURIComponent(category)}/detail/${encodeURIComponent(id)}`} prefetch={false}>
              <h2>{productName}</h2>
            </Link>
          </span>
          <span className={classes.product_price}>
            <ProductPrice price={formattedPrice} hasStock={hasStock} />
          </span>
        </div>
        <span className={classes.product_select_quantity}>
          <CartUnitsSection
            color='black'
            currentProduct={{ ...product }}
          />
        </span>
      </li>
    </article>
  )
}
