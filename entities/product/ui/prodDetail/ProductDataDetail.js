import classes from './ProductDataDetail.module.css'

export function ProductDataDetail ({ children, prodDetailInfo }) {
  const {
    prodDescription: { description, genericDescription },
    prodDestillery: { destillery, destilleryUIText },
    prodAlcohol: { alcohol, alcoholUIText, formattedAlcohol }
  } = prodDetailInfo

  return (
    <div className={classes.product_data}>
      <div className={classes.product_description}>
        <p>
          {description || genericDescription}
        </p>
        {destillery && (
          <p className={classes.destillery_text}>
            {destilleryUIText}
            <span className={classes.destillery_var}>
              {destillery}
            </span>
          </p>
        )}
        {alcohol && (
          <p className={classes.alcohol_text}>
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
