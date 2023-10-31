'use client'
import classes from './ProductListSlideClient.module.css'
import listSlideButtons from './ListSlideButtons.module.css'
import TriangleButton from '@/shared/ui/lib/TriangleButton'
import ProductListSlide from './lib/ProductListSlide'
import { useRef } from 'react'
import CategoryTitleNav from '@/widgets/lib/CategoryTitleNav'

export default function ProductListSlideClient ({ category, type = '', specificProductList }) {
  const scrollRef = useRef(null)

  const moreThanOneProduct = specificProductList.length > 1

  const handleScroll = (direction) => () => {
    return scrollRef.current.handleScroll(direction)
  }

  return (
    <section className={classes.product_list_client_container}>
      <CategoryTitleNav category={category} type={type} />
      <div className={classes.product_list_client_slider}>
        <TriangleButton
          slideDirection='x'
          customClasses={listSlideButtons.button_list_left}
          onClick={handleScroll('left')}
          triangleStyle={{
            fill: 'white',
            transform: 'rotate(-90deg)',
            visibility: `${moreThanOneProduct ? 'visible' : 'hidden'}`
          }}
        />
        <ProductListSlide
          ref={scrollRef}
          products={specificProductList}
        />
        <TriangleButton
          slideDirection='x'
          customClasses={listSlideButtons.button_list_right}
          onClick={handleScroll('right')}
          triangleStyle={{
            fill: 'white',
            transform: 'rotate(90deg)',
            visibility: `${moreThanOneProduct ? 'visible' : 'hidden'}`
          }}
        />
      </div>
    </section>
  )
}
