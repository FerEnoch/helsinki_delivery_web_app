'use client'
import { useCallback, useRef, useState } from 'react'
import ProductList from './lib/ProductList'
import VerticalSliderBackgound from './lib/VerticalSliderBackgound'

export default function ProductListClient ({ category, type, isCombo }) {
  const scrollRef = useRef(null)
  const [isArrowVisible, setArrowVisibility] = useState(false)

  const handleArrowsVisibility = useCallback(prodQuantity => {
    const minToShowArrows = isCombo ? 3 : 5
    setArrowVisibility(prodQuantity >= minToShowArrows)
  }, [isCombo])

  return (
    <VerticalSliderBackgound scrollRef={scrollRef} isArrowVisible={isArrowVisible}>
      <ProductList
        ref={scrollRef}
        category={category}
        type={type}
        handleArrowsVisibility={handleArrowsVisibility}
        isCombo={isCombo}
      />
    </VerticalSliderBackgound>
  )
}
