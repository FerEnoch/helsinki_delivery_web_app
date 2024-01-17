import Link from 'next/link'
import classes from './SlideCard.module.css'
import ProductDetailCartSection from '@/entities/cart/ui/ProductDetailCartSection'
import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import PlusInfoButton from '@/entities/product/ui/lib/PlusInfoButton'
import ProductImage from '@/entities/product/ui/lib/ProductImage'

export default function SlideCard ({ product }) {
  const { category, id, name, image, imageID } = product

  return (
    <article className={classes.product_card_wrapper}>
      <li className={classes.product_card}>
        <Link
          href={`/${encodeURIComponent(category)}/detail/${encodeURIComponent(id)}`}
          prefetch={false}
        >
          <span className={classes.plusInfoButton_wrapper}>
            <PlusInfoButton />
          </span>
        </Link>
        <div className={classes.product_image}>
          <ProductImage
            svgWidth={180}
            svgHeight={200}
            width={150}
            height={200}
            alt={name}
            src={image}
            imageID={imageID}
            category={category}
          />
        </div>
        <div className={classes.product_data}>
          <div className={classes.product_name}>
            <Link
              href={`/${encodeURIComponent(category)}/detail/${encodeURIComponent(id)}`}
              prefetch={false}
            >
              <h2>{formatUpperCase(name) || name.toUpperCase()}</h2>
            </Link>
          </div>
          <ProductDetailCartSection product={product} />
        </div>
      </li>
    </article>
  )
}
