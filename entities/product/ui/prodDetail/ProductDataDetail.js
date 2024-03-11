import ComboDescription from '@/widgets/sliders/ui/lib/ComboDescription'
import classes from './ProductDataDetail.module.css'
import { Suspense } from 'react'

export function ProductDataDetail ({ children, prodDetailInfo }) {
  const {
    prodDescription: { description, genericDescription },
    prodDestillery: { destillery, destilleryUIText },
    prodAlcohol: { alcoholUIText, formattedAlcohol },
    comboProducts
  } = prodDetailInfo

  const isDescriptionLong = description?.length > 145

  const pageDescription = comboProducts.length > 0
    ? <ComboDescription products={comboProducts} />
    : (description || genericDescription)

  return (
    <div className={classes.product_data}>
      <div className={classes.product_description}>
        <p style={{
          fontSize: `${isDescriptionLong ? '1rem' : '1.1rem'}`,
          paddingBlockEnd: `${isDescriptionLong ? '.2rem' : '1rem'}`
        }}
        >
          <Suspense>
            {pageDescription}
          </Suspense>
        </p>
        {destillery && (
          <p
            style={{
              padding: `${isDescriptionLong ? '.1rem' : '.5rem'}`
            }}
            className={classes.destillery_text}
          >
            {destilleryUIText}
            <span className={classes.destillery_var}>
              {destillery}
            </span>
          </p>
        )}
        {!formattedAlcohol.includes('0%') && (
          <p
            style={{
              fontSize: `${isDescriptionLong ? '.9rem' : '1rem'}`,
              paddingBlock: `${isDescriptionLong ? '.1rem' : '.5rem'}`
            }}
            className={classes.alcohol_text}
          >
            {alcoholUIText}
            <span className={classes.alcohol_var}>
              {formattedAlcohol}
            </span>
          </p>
        )}
      </div>
      <div className={classes.cart_section}>
        {children}
      </div>
    </div>
  )
}
