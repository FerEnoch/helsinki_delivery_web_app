'use client'
import VerticalSliderBackgound from '@/widgets/sliders/ui/lib/VerticalSliderBackgound'
import { useRef, useState } from 'react'
import classes from './CartProductsSlider.module.css'
import CartProducts from '@/features/addToCart/ui/CartProducts'

export default function CartProductsSlider () {
  const scrollRef = useRef(null)
  const [isArrowVisible, setArrowVisibility] = useState(false)

  const handleArrowsVisibility = (prodQuantity) => {
    setArrowVisibility(prodQuantity > 2)
  }

  return (
    <VerticalSliderBackgound
      scrollRef={scrollRef}
      className={classes.cart_products_slider_container}
      controlsSize={{ width: 18, height: 18 }}
      isArrowVisible={isArrowVisible}
    >
      <CartProducts ref={scrollRef} handleArrowsVisibility={handleArrowsVisibility} />
    </VerticalSliderBackgound>
  )
}
