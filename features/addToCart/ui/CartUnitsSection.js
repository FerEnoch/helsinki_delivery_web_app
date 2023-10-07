import classes from './CartUnitsSection.module.css'
import { i18n } from '@/shared/model/i18n'
import { CART_OPERATIONS } from '../lib/updateQuantityOperations'
import { useEffect, useState } from 'react'
import { useAppStore } from '@/entities/lib/store'

const { UNIT_MEASURE: units } = i18n.LANG.ESP.UI.CART

export default function CartUnitsSection ({ color, currentProduct, displayQuantity = true }) {
  const { updateQuantity, getProductCurrentQuantity, addToCart } = useAppStore()
  const [currentQuantity, setCurrentQuantity] = useState(() => getProductCurrentQuantity(currentProduct.id))

  const handleUpdateQuantity = (OPERATION) => () => {
    updateQuantity(currentProduct.id, OPERATION)
    const currentProductQuantity = getProductCurrentQuantity(currentProduct.id)
    if ((currentProductQuantity === 0) &&
     (OPERATION === CART_OPERATIONS.INCREMENT)) {
      addToCart({ ...currentProduct })
      setCurrentQuantity(getProductCurrentQuantity(currentProduct.id))
      return
    }
    setCurrentQuantity(currentProductQuantity)
  }

  useEffect(() => {
    setCurrentQuantity(getProductCurrentQuantity(currentProduct.id))
  }, [currentProduct, getProductCurrentQuantity])

  return (
    <section className={classes.cart_quantity_wrapper}>
      <div className={classes.units_measure}>
        <p style={{
          color,
          paddingBlockEnd: `${!displayQuantity && '1rem'}`
        }}
        >
          {displayQuantity && units.toUpperCase()}
        </p>
      </div>
      <div
        className={classes.number_buttons_wrapper}
        style={{
          width: `${!displayQuantity && '1.6rem'}`,
          marginInline: `${!displayQuantity && 'auto'}`
        }}
      >
        {
          displayQuantity &&
          (
            <div className={classes.product_quantity} style={{ color }}>
              {currentQuantity}
            </div>
          )
        }
        <div className={classes.operation_buttons} style={{ color }}>
          <button
            className={`${classes.operation_button} ${classes.button_plus}`}
            onClick={handleUpdateQuantity(CART_OPERATIONS.INCREMENT)}
          >
            +
          </button>
          <button
            className={`${classes.operation_button} ${classes.button_minus}`}
            onClick={handleUpdateQuantity(CART_OPERATIONS.DECREMENT)}
          >
            -
          </button>
        </div>
      </div>
    </section>
  )
}
