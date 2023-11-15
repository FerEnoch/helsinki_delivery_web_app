'use client'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import classes from './CartProducts.module.css'
import { scrollToNextProduct } from '../lib/scrollToNextProduct'
import { useAppStore } from '@/entities/lib/store'
import CartItem from './CartItem'
import EmptyCart from './EmptyCart'

/* A simple multiplier to adapt the cart vertical longitude to the products quantity */
const cartGrayBackgroundHeight = 5.41

export default forwardRef(function CartProducts ({ handleArrowsVisibility }, ref) {
  const listRef = useRef(null)
  const { cart } = useAppStore()
  const [currentVisibleProds, setCurrentVisibleProds] = useState(0)
  const [showArrows, setShowArrows] = useState(0)

  useImperativeHandle(ref, () => {
    return {
      handleScroll (scrollDirection) {
        let nextCardIndex
        if (scrollDirection === 'up') {
          nextCardIndex = currentVisibleProds - 1
          if (nextCardIndex < 0) {
            nextCardIndex = ((cart.length / 2)) - 1
          }
        }
        if (scrollDirection === 'down') {
          nextCardIndex = currentVisibleProds + 1
          if (nextCardIndex >= (cart.length / 2)) {
            nextCardIndex = 0
          }
        }

        const currentIndex = scrollToNextProduct({
          containerRef: listRef,
          direction: 'y',
          index: nextCardIndex,
          correctionPixels: -6
        })

        setCurrentVisibleProds(currentIndex)
      }
    }
  }, [cart, currentVisibleProds])

  useEffect(() => {
    if (cart) handleArrowsVisibility(showArrows)
  }, [cart, showArrows, handleArrowsVisibility])

  if (!cart.length) return <EmptyCart />

  return (
    <section ref={listRef} className={classes.cart_list_container}>
      <div
        className={classes.gray_background}
        style={{ height: `${cart.length * cartGrayBackgroundHeight}rem` }}
      />
      <ul className={classes.product_list}>
        {cart.length > 0 &&
          cart.map(product => {
            return (
              <CartItem
                key={product.id}
                product={product}
                showArrows={setShowArrows}
              />
            )
          })}
      </ul>
    </section>
  )
})
