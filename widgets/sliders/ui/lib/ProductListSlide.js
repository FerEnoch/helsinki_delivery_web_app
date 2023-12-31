import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import classes from './ProductListSlide.module.css'
import SlideCard from './SlideCard'
import { scrollToNextProduct } from '@/features/addToCart/lib/scrollToNextProduct'

export default forwardRef(function ProductListSlide ({ products }, ref) {
  const listRef = useRef(null)
  const [currentProdsViewIndex, setCurrentProdsViewIndex] = useState(0)

  useImperativeHandle(ref, () => {
    return {
      handleScroll (scrollDirection) {
        let nextCardIndex
        if (scrollDirection === 'left') {
          nextCardIndex = currentProdsViewIndex - 1
          if (nextCardIndex < 0) {
            nextCardIndex = products.length - 1
          }
        }
        if (scrollDirection === 'right') {
          nextCardIndex = currentProdsViewIndex + 1
          if (nextCardIndex >= products.length) {
            nextCardIndex = 0
          }
        }

        const currentIndex = scrollToNextProduct({
          containerRef: listRef,
          direction: 'x',
          index: nextCardIndex,
          cardWidth: listRef.current.children[0]?.offsetWidth
        })

        setCurrentProdsViewIndex(currentIndex)
      }
    }
  }, [products, currentProdsViewIndex])

  const handleWheelEvent = (e) => {
    const list = listRef.current
    list.scrollTo({
      left: list.scrollLeft + e.deltaY,
      behavior: 'smooth'
    })
  }

  return (
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
                  product={product}
                />
              )
            })
          }
      </ul>
    </section>
  )
}
)
