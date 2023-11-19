'use client'
import TriangleButton from '@/shared/ui/lib/TriangleButton'
import listSlideButtons from '../ListSlideButtons.module.css'
import productListClient from './VerticalSliderBackgound.module.css'

export default function VerticalSliderBackgound ({
  children,
  scrollRef,
  className,
  controlsSize,
  isArrowVisible
}) {
  const handleScroll = (direction) => () => {
    return scrollRef.current.handleScroll(direction)
  }

  return (
    <div className={`${productListClient.product_list_client_container} ${className}`}>
      <TriangleButton
        slideDirection='y'
        onClick={handleScroll('up')}
        customClasses={listSlideButtons.button_list_up}
        triangleStyle={{
          fill: 'white',
          visibility: `${isArrowVisible ? 'visible' : 'hidden'}`
        }}
        {...controlsSize}
      />
      {children}
      <TriangleButton
        slideDirection='y'
        onClick={handleScroll('down')}
        customClasses={listSlideButtons.button_list_down}
        triangleStyle={{
          fill: 'white',
          transform: 'rotate(-180deg)',
          visibility: `${isArrowVisible ? 'visible' : 'hidden'}`
        }}
        {...controlsSize}
      />
    </div>
  )
}
