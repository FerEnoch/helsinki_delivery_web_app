import { forwardRef, Suspense, useImperativeHandle, useRef, useState } from 'react'
import classes from './ProductListSlide.module.css'
import SlideCard from './SlideCard'
import { scrollToNextProduct } from '@/features/addToCart/lib/scrollToNextProduct'

export default forwardRef(function ProductListSlide ({ products }, ref) {
  const listRef = useRef(null)
  const [currentVisibleProds, setCurrentVisibleProds] = useState(0)

  useImperativeHandle(ref, () => {
    return {
      handleScroll (scrollDirection) {
        let nextCardIndex
        if (scrollDirection === 'left') {
          nextCardIndex = currentVisibleProds - 1
          if (nextCardIndex < 0) {
            nextCardIndex = ((products.length / 2)) - 1
          }
        }
        if (scrollDirection === 'right') {
          nextCardIndex = currentVisibleProds + 1
          if (nextCardIndex >= (products.length / 2)) {
            nextCardIndex = 0
          }
        }

        const currentIndex = scrollToNextProduct({
          containerRef: listRef,
          direction: 'x',
          index: nextCardIndex,
          correctionPixels: 10
        })

        setCurrentVisibleProds(currentIndex)
      }
    }
  }, [products, currentVisibleProds])

  const handleWheelEvent = (e) => {
    const list = listRef.current
    list.scrollTo({
      left: list.scrollLeft + e.deltaY,
      behavior: 'smooth'
    })
  }

  return (
    <Suspense>
      <section
        className={classes.product_slide_container}
        style={{ width: `${products.length > 1 ? '85%' : '55%'}` }}
      >
        <ul
          ref={listRef}
          className={classes.product_list}
          onWheel={handleWheelEvent}
        >
          {
          products?.length > 0 &&
            products.map(product => {
              return (
                <SlideCard
                  key={product.id}
                  product={{ ...product }}
                />
              )
            })
          }
        </ul>
      </section>
    </Suspense>
  )
}
)
