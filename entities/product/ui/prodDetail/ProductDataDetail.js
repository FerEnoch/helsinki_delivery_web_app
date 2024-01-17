import classes from './ProductDataDetail.module.css'

export function ProductDataDetail ({ children, prodDetailInfo }) {
  const {
    prodDescription: { description, genericDescription },
    prodDestillery: { destillery, destilleryUIText },
    prodAlcohol: { alcoholUIText, formattedAlcohol }
  } = prodDetailInfo

  const isDescriptionLong = description?.length > 145

  return (
    <div className={classes.product_data}>
      <div className={classes.product_description}>
        <p style={{
          fontSize: `${isDescriptionLong ? '1rem' : '1.1rem'}`,
          paddingBlockEnd: `${isDescriptionLong ? '.2rem' : '1rem'}`
        }}
        >
          {description || genericDescription}
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
