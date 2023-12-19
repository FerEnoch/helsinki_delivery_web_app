'use client'
import { codecProBold } from '@/shared/config/fonts'
import classes from './EmptyCart.module.css'
import { i18n } from '@/shared/model/i18n'

const { CART: { EMPTY_CART_MESSAGE: emptyCartMessage } } = i18n.LANG.ESP.UI

export default function EmptyCart () {
  return (
    <div className={classes.empty_cart_background}>
      <h1 className={`${classes.empty_cart_message} ${codecProBold.className} `}>
        {emptyCartMessage}
      </h1>
    </div>
  )
}
