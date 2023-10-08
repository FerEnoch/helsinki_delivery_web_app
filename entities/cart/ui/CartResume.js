'use client'
import { useAppStore } from '@/entities/lib/store'
import classes from './CartResume.module.css'
import { i18n } from '@/shared/model/i18n'

const { CART: cartTexts } = i18n.LANG.ESP.UI

export default function CartResume () {
  const { cart } = useAppStore()
  const cartResume = cart.length > 0
    ? cart?.map(({ name, quantity }) => `(${quantity}) ${name}`).join(' // ')
    : cartTexts.EMPTY_CART_MESSAGE

  return (
    <section className={classes.cart_resume}>
      <p className={classes.text}>{cartResume.toUpperCase()}</p>
    </section>
  )
}
