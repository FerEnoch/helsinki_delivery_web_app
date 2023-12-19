'use client'
import { useCallback, useRef, useState } from 'react'
import ProductList from './lib/ProductList'
import VerticalSliderBackgound from './lib/VerticalSliderBackgound'

export default function ProductListClient (props) {
  const scrollRef = useRef(null)
  const [isArrowVisible, setArrowVisibility] = useState(false)

  const handleArrowsVisibility = useCallback(prodQuantity => {
    setArrowVisibility(prodQuantity > 4)
  }, [])

  return (
    <VerticalSliderBackgound scrollRef={scrollRef} isArrowVisible={isArrowVisible}>
      <ProductList
        ref={scrollRef}
        {...props}
        handleArrowsVisibility={handleArrowsVisibility}
      />
    </VerticalSliderBackgound>
  )
}
