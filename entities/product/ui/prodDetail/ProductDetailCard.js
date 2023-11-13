import classes from './ProductDetailCard.module.css'
import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import { i18n } from '@/shared/model/i18n'
import ProductImage from '../lib/ProductImage'
import ProductDetailCartSection from '@/entities/cart/ui/ProductDetailCartSection'
import DetailCardFooter from './DetailCardFooter'

const { DETAIL_CARD_PRODUCT: { BODY: { generic_description: genericDescription } } } = i18n.LANG.ESP.UI
const destilleryUIText = 'Destilería: '
const alcoholUIText = 'Alcohol: '
const formatAlcohol = (alcohol) => Number(alcohol) * 100

export default function ProductDetailCard ({ product }) {
  const {
    name,
    category,
    image,
    description,
    destillery,
    alcohol
  } = product

  const formattedAlcohol = formatAlcohol(alcohol)

  return (
    <article className={classes.card}>
      <h1 className={classes.product_name}>
        {`${formatUpperCase(name) || name.toUpperCase()}`}
      </h1>
      <section className={classes.card_body}>
        <div className={classes.product_image}>
          <ProductImage
            width={270}
            height={300}
            alt={name}
            src={image}
            category={category}
          />
        </div>
        <div className={classes.product_data}>
          <div className={classes.product_description}>
            <p>
              {description || genericDescription}
            </p>
            {
               destillery && (
                 <p className={classes.destillery_text}>
                   {destilleryUIText}
                   <span className={classes.destillery_var}>{destillery}</span>
                 </p>
               )
            }
            {
               alcohol && (
                 <p className={classes.alcohol_text}>
                   {alcoholUIText}
                   <span className={classes.alcohol_var}>{formattedAlcohol}%</span>
                 </p>
               )
            }
          </div>
          <div className={classes.cart_section}>
            <ProductDetailCartSection product={product} />
          </div>
        </div>
      </section>
      <DetailCardFooter category={category} />
    </article>
  )
}
