import classes from './ProductDetailCard.module.css'
import ProductImage from '../lib/ProductImage'
import ProductDetailCartSection from '@/entities/cart/ui/ProductDetailCartSection'
import DetailCardFooter from './DetailCardFooter'
import { useProductData } from '../../lib/useProductData'
import { useMemo } from 'react'
import { ProductDataDetail } from './ProductDataDetail'

export default function ProductDetailCard ({ product }) {
  const memoProduct = useMemo(() => product, [product])
  const {
    prodInfo: { name, category, image },
    prodDetailInfo
  } = useProductData(memoProduct)

  return (
    <article className={classes.card}>
      <h1 className={classes.product_name}>
        {name}
      </h1>
      <section className={classes.card_body}>
        <div className={classes.product_image}>
          <ProductImage
            svgWidth={180}
            svgHeight={200}
            width={270}
            height={300}
            alt={name}
            src={image}
            category={category}
          />
        </div>
        <ProductDataDetail prodDetailInfo={prodDetailInfo}>
          <ProductDetailCartSection product={memoProduct} />
        </ProductDataDetail>
      </section>
      <DetailCardFooter category={category} />
    </article>
  )
}
